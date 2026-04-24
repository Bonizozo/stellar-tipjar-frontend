/**
 * Stellar TipJar - Background Service Worker
 * Manages wallet state persistence and proxies API calls from popup/content scripts.
 */

const API_BASE = "http://localhost:8000";
const STELLAR_HORIZON_URL = "https://horizon-testnet.stellar.org";

// ─── Wallet state (in-memory, persisted to chrome.storage.local) ──────────────
let walletState = {
  connected: false,
  publicKey: null,
  balance: "0.0",
};

// Restore wallet state on startup
chrome.storage.local.get(["walletState"], (result) => {
  if (result.walletState) {
    walletState = result.walletState;
  }
});

function persistWalletState() {
  chrome.storage.local.set({ walletState });
}

// ─── Stellar balance fetch ────────────────────────────────────────────────────
async function fetchBalance(publicKey) {
  try {
    const res = await fetch(`${STELLAR_HORIZON_URL}/accounts/${publicKey}`);
    if (!res.ok) return "0.0";
    const data = await res.json();
    const native = data.balances?.find((b) => b.asset_type === "native");
    return native ? native.balance : "0.0";
  } catch {
    return "0.0";
  }
}

// ─── API helpers ──────────────────────────────────────────────────────────────
async function apiRequest(path, init) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`API error ${res.status}: ${text}`);
  }
  return res.json();
}

async function getCreatorProfile(username) {
  return apiRequest(`/creators/${username}`);
}

async function createTipIntent(payload) {
  return apiRequest("/tips/intents", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ─── Freighter wallet integration ─────────────────────────────────────────────
// Freighter is a browser extension and its API is only accessible from page
// context (content scripts / popup). The background service worker cannot
// directly call @stellar/freighter-api. Instead, the popup communicates with
// Freighter directly and reports the result back here for state storage.
//
// For wallet connect/disconnect, the popup handles the Freighter interaction
// via the injected freighter-api script, then sends the result to background.

// ─── Message handler ──────────────────────────────────────────────────────────
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  const { type, payload } = message;

  switch (type) {
    // Popup reports a successful Freighter connection
    case "WALLET_CONNECTED": {
      walletState = {
        connected: true,
        publicKey: payload.publicKey,
        balance: payload.balance ?? "0.0",
      };
      persistWalletState();
      sendResponse({ ok: true });
      break;
    }

    case "WALLET_DISCONNECT": {
      walletState = { connected: false, publicKey: null, balance: "0.0" };
      persistWalletState();
      sendResponse({ ok: true });
      break;
    }

    case "GET_WALLET_STATE": {
      sendResponse(walletState);
      break;
    }

    case "GET_BALANCE": {
      if (!walletState.publicKey) {
        sendResponse({ balance: "0.0" });
        break;
      }
      fetchBalance(walletState.publicKey).then((balance) => {
        walletState.balance = balance;
        persistWalletState();
        sendResponse({ balance });
      });
      return true; // async
    }

    case "SEND_TIP": {
      if (!walletState.connected) {
        sendResponse({ error: "Wallet not connected." });
        break;
      }
      createTipIntent(payload)
        .then((result) => sendResponse(result))
        .catch((err) => sendResponse({ error: err.message }));
      return true; // async
    }

    case "GET_CREATOR_PROFILE": {
      getCreatorProfile(payload.username)
        .then((profile) => sendResponse({ profile }))
        .catch((err) => sendResponse({ error: err.message }));
      return true; // async
    }

    default:
      sendResponse({ error: `Unknown message type: ${type}` });
  }

  return false;
});
