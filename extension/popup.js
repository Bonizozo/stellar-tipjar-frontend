/**
 * Stellar TipJar - Popup Script
 * Handles wallet state, creator detection results, and tip submission.
 */

const API_BASE = "http://localhost:8000";

// ─── DOM refs ────────────────────────────────────────────────────────────────
const walletDisconnected = document.getElementById("wallet-disconnected");
const walletConnected = document.getElementById("wallet-connected");
const walletBalance = document.getElementById("wallet-balance");
const walletAddress = document.getElementById("wallet-address");
const walletError = document.getElementById("wallet-error");
const connectBtn = document.getElementById("connect-btn");
const disconnectBtn = document.getElementById("disconnect-btn");

const creatorSection = document.getElementById("creator-section");
const creatorName = document.getElementById("creator-name");
const creatorMeta = document.getElementById("creator-meta");

const tipForm = document.getElementById("tip-form");
const amountInput = document.getElementById("amount-input");
const assetSelect = document.getElementById("asset-select");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const tipStatus = document.getElementById("tip-status");

const noCreator = document.getElementById("no-creator");
const connectPrompt = document.getElementById("connect-prompt");
const detectedCount = document.getElementById("detected-count");

// ─── State ───────────────────────────────────────────────────────────────────
let currentCreator = null;
let walletState = { connected: false, publicKey: null, balance: "0.0" };

// ─── Helpers ─────────────────────────────────────────────────────────────────
function show(el) { el.classList.remove("hidden"); }
function hide(el) { el.classList.add("hidden"); }

function formatAddress(addr) {
  if (!addr) return "";
  return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
}

function showTipStatus(message, type) {
  tipStatus.textContent = message;
  tipStatus.className = `status status-${type}`;
  show(tipStatus);
}

function hideTipStatus() { hide(tipStatus); }

// ─── Wallet UI ───────────────────────────────────────────────────────────────
function renderWallet() {
  hide(walletError);
  if (walletState.connected) {
    hide(walletDisconnected);
    show(walletConnected);
    walletBalance.textContent = `${parseFloat(walletState.balance).toFixed(2)} XLM`;
    walletAddress.textContent = formatAddress(walletState.publicKey);
  } else {
    show(walletDisconnected);
    hide(walletConnected);
  }
  renderMain();
}

function renderMain() {
  hide(tipForm);
  hide(noCreator);
  hide(connectPrompt);
  hide(creatorSection);

  if (!walletState.connected) {
    show(connectPrompt);
    return;
  }

  if (currentCreator) {
    creatorName.textContent = `@${currentCreator.username}`;
    if (currentCreator.displayName && currentCreator.displayName !== `@${currentCreator.username}`) {
      creatorName.textContent = `${currentCreator.displayName} (@${currentCreator.username})`;
    }
    creatorMeta.textContent = currentCreator.source || "Detected on this page";
    show(creatorSection);
    show(tipForm);
    hideTipStatus();
  } else {
    show(noCreator);
  }
}

// ─── Freighter wallet helpers (popup has page context, can use freighter-api) ──
async function freighterConnect() {
  // Freighter injects window.freighter into the page context.
  // In MV3 popups, we access it via the window object directly.
  const freighter = window.freighter;
  if (!freighter) {
    throw new Error("FREIGHTER_NOT_INSTALLED");
  }

  const connResult = await freighter.isConnected();
  const isConn = connResult?.isConnected ?? connResult === true;
  if (!isConn) throw new Error("FREIGHTER_NOT_INSTALLED");

  const allowedResult = await freighter.isAllowed();
  const isAllowed = allowedResult?.isAllowed ?? allowedResult === true;
  if (!isAllowed) {
    const setResult = await freighter.setAllowed();
    const nowAllowed = setResult?.isAllowed ?? setResult === true;
    if (!nowAllowed) throw new Error("USER_DECLINED");
  }

  const addrResult = await freighter.getAddress();
  const address =
    typeof addrResult === "string"
      ? addrResult
      : addrResult?.address ?? null;

  if (!address) throw new Error("Failed to get address from Freighter.");
  return address;
}

// ─── Wallet actions ───────────────────────────────────────────────────────────
connectBtn.addEventListener("click", async () => {
  connectBtn.disabled = true;
  connectBtn.innerHTML = '<span class="spinner"></span>Connecting...';
  hide(walletError);

  try {
    const publicKey = await freighterConnect();
    const balRes = await chrome.runtime.sendMessage({ type: "GET_BALANCE" });
    // Report to background for persistence
    await chrome.runtime.sendMessage({
      type: "WALLET_CONNECTED",
      payload: { publicKey, balance: balRes.balance ?? "0.0" },
    });
    walletState = { connected: true, publicKey, balance: balRes.balance ?? "0.0" };
    renderWallet();
  } catch (e) {
    const msg = e.message === "FREIGHTER_NOT_INSTALLED"
      ? "Freighter is not installed. Get it at freighter.app."
      : e.message === "USER_DECLINED"
      ? "Connection declined."
      : "Failed to connect. Make sure Freighter is installed.";
    walletError.textContent = msg;
    show(walletError);
  } finally {
    connectBtn.disabled = false;
    connectBtn.textContent = "Connect Freighter";
  }
});

disconnectBtn.addEventListener("click", async () => {
  await chrome.runtime.sendMessage({ type: "WALLET_DISCONNECT" });
  walletState = { connected: false, publicKey: null, balance: "0.0" };
  renderWallet();
});

// ─── Quick amount buttons ─────────────────────────────────────────────────────
document.querySelectorAll(".quick-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".quick-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    amountInput.value = btn.dataset.amount;
  });
});

amountInput.addEventListener("input", () => {
  document.querySelectorAll(".quick-btn").forEach((b) => b.classList.remove("active"));
});

// ─── Send tip ─────────────────────────────────────────────────────────────────
sendBtn.addEventListener("click", async () => {
  if (!currentCreator) return;

  const amount = parseFloat(amountInput.value);
  if (!amount || amount < 0.01) {
    showTipStatus("Minimum tip is 0.01 XLM.", "error");
    return;
  }

  const assetCode = assetSelect.value;
  const message = messageInput.value.trim();

  sendBtn.disabled = true;
  sendBtn.innerHTML = '<span class="spinner"></span>Sending...';
  hideTipStatus();

  try {
    const response = await chrome.runtime.sendMessage({
      type: "SEND_TIP",
      payload: {
        username: currentCreator.username,
        amount: amount.toString(),
        assetCode,
        message: message || undefined,
      },
    });

    if (response.error) {
      showTipStatus(response.error, "error");
    } else {
      showTipStatus(`Tip sent! Intent ID: ${response.intentId}`, "success");
      amountInput.value = "5";
      messageInput.value = "";
      document.querySelectorAll(".quick-btn").forEach((b) => b.classList.remove("active"));
      // Refresh balance
      const balRes = await chrome.runtime.sendMessage({ type: "GET_BALANCE" });
      if (balRes.balance) {
        walletState.balance = balRes.balance;
        walletBalance.textContent = `${parseFloat(balRes.balance).toFixed(2)} XLM`;
      }
    }
  } catch (e) {
    showTipStatus("Failed to send tip. Please try again.", "error");
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = "Send Tip";
  }
});

// ─── Init ─────────────────────────────────────────────────────────────────────
async function init() {
  // Load wallet state from background
  const walletRes = await chrome.runtime.sendMessage({ type: "GET_WALLET_STATE" });
  if (walletRes && walletRes.connected) {
    walletState = { connected: true, publicKey: walletRes.publicKey, balance: walletRes.balance };
  }

  // Ask content script for detected creators on the active tab
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) {
      const creatorRes = await chrome.tabs.sendMessage(tab.id, { type: "GET_DETECTED_CREATORS" });
      if (creatorRes?.creators?.length > 0) {
        currentCreator = creatorRes.creators[0];
        if (creatorRes.creators.length > 1) {
          detectedCount.textContent = `${creatorRes.creators.length} creators found`;
        }
      }
    }
  } catch {
    // Content script may not be injected on restricted pages (chrome://, etc.)
  }

  renderWallet();
}

init();
