/**
 * Stellar TipJar - Popup Script
 * Handles wallet state, creator detection results, discovery, and tip submission.
 */

// ─── DOM refs ────────────────────────────────────────────────────────────────
const walletConnected = document.getElementById("wallet-connected");
const walletDisconnected = document.getElementById("wallet-disconnected");
const walletBalance = document.getElementById("wallet-balance");
const walletAddress = document.getElementById("wallet-address");
const walletError = document.getElementById("wallet-error");
const connectBtn = document.getElementById("connect-btn");
const disconnectBtn = document.getElementById("disconnect-btn");
const optionsBtn = document.getElementById("options-btn");

const tabTip = document.getElementById("tab-tip");
const tabDiscover = document.getElementById("tab-discover");
const sectionTip = document.getElementById("section-tip");
const sectionDiscover = document.getElementById("section-discover");

const creatorDetected = document.getElementById("creator-detected");
const creatorName = document.getElementById("creator-name");
const creatorMeta = document.getElementById("creator-meta");
const creatorAvatar = document.getElementById("creator-avatar");
const noCreator = document.getElementById("no-creator");
const connectPrompt = document.getElementById("connect-prompt");

const amountInput = document.getElementById("amount-input");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const tipStatus = document.getElementById("tip-status");

const searchInput = document.getElementById("search-input");
const creatorList = document.getElementById("creator-list");
const discoveryLoading = document.getElementById("discovery-loading");
const discoveryEmpty = document.getElementById("discovery-empty");

// ─── State ───────────────────────────────────────────────────────────────────
let currentCreator = null;
let walletState = { connected: false, publicKey: null, balance: "0.0" };
let settings = { defaultAmount: "5", preferredAsset: "XLM" };

// ─── Helpers ─────────────────────────────────────────────────────────────────
function show(el) { el.classList.remove("hidden"); }
function hide(el) { el.classList.add("hidden"); }

function formatAddress(addr) {
  if (!addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

function showTipStatus(message, type) {
  tipStatus.textContent = message;
  tipStatus.className = `status status-${type}`;
  show(tipStatus);
}

// ─── Tabs ────────────────────────────────────────────────────────────────────
function switchTab(tab) {
  if (tab === "tip") {
    tabTip.classList.add("active");
    tabDiscover.classList.remove("active");
    show(sectionTip);
    hide(sectionDiscover);
  } else {
    tabTip.classList.remove("active");
    tabDiscover.classList.add("active");
    hide(sectionTip);
    show(sectionDiscover);
    fetchTrendingCreators();
  }
}

tabTip.addEventListener("click", () => switchTab("tip"));
tabDiscover.addEventListener("click", () => switchTab("discover"));

optionsBtn.addEventListener("click", () => chrome.runtime.openOptionsPage());

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
  hide(creatorDetected);
  hide(noCreator);
  hide(connectPrompt);

  if (!walletState.connected) {
    show(connectPrompt);
    return;
  }

  if (currentCreator) {
    creatorName.textContent = `@${currentCreator.username}`;
    if (currentCreator.displayName && currentCreator.displayName !== `@${currentCreator.username}`) {
      creatorName.textContent = currentCreator.displayName;
      creatorMeta.textContent = `@${currentCreator.username} • ${currentCreator.source}`;
    } else {
      creatorMeta.textContent = currentCreator.source || "Detected on this page";
    }
    
    // Generate avatar seed from username
    creatorAvatar.textContent = currentCreator.username.charAt(0).toUpperCase();
    
    show(creatorDetected);
  } else {
    show(noCreator);
  }
}

// ─── Freighter Connect ──────────────────────────────────────────────────────
async function freighterConnect() {
  const freighter = window.freighter;
  if (!freighter) throw new Error("FREIGHTER_NOT_INSTALLED");

  const connResult = await freighter.isConnected();
  if (!(connResult?.isConnected ?? connResult === true)) throw new Error("FREIGHTER_NOT_INSTALLED");

  const allowedResult = await freighter.isAllowed();
  if (!(allowedResult?.isAllowed ?? allowedResult === true)) {
    const setResult = await freighter.setAllowed();
    if (!(setResult?.isAllowed ?? setResult === true)) throw new Error("USER_DECLINED");
  }

  const addrResult = await freighter.getAddress();
  const address = typeof addrResult === "string" ? addrResult : addrResult?.address;
  if (!address) throw new Error("Failed to get address.");
  return address;
}

connectBtn.addEventListener("click", async () => {
  connectBtn.disabled = true;
  connectBtn.innerHTML = '<span class="spinner"></span>Connecting...';
  try {
    const publicKey = await freighterConnect();
    const balRes = await chrome.runtime.sendMessage({ type: "GET_BALANCE" });
    await chrome.runtime.sendMessage({
      type: "WALLET_CONNECTED",
      payload: { publicKey, balance: balRes.balance ?? "0.0" },
    });
    walletState = { connected: true, publicKey, balance: balRes.balance ?? "0.0" };
    renderWallet();
  } catch (e) {
    walletError.textContent = e.message.includes("INSTALLED") ? "Install Freighter wallet." : "Connection failed.";
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

// ─── Tipping ─────────────────────────────────────────────────────────────────
sendBtn.addEventListener("click", async () => {
  if (!currentCreator) return;
  const amount = amountInput.value;
  hide(tipStatus);
  sendBtn.disabled = true;
  sendBtn.innerHTML = '<span class="spinner"></span>Sending...';

  try {
    const res = await chrome.runtime.sendMessage({
      type: "SEND_TIP",
      payload: { username: currentCreator.username, amount, assetCode: "XLM", message: messageInput.value }
    });

    if (res.error) {
      showTipStatus(res.error, "error");
    } else {
      showTipStatus("Tip sent successfully!", "success");
      const balRes = await chrome.runtime.sendMessage({ type: "GET_BALANCE" });
      walletState.balance = balRes.balance;
      walletBalance.textContent = `${parseFloat(balRes.balance).toFixed(2)} XLM`;
    }
  } catch (e) {
    showTipStatus("Failed to send tip.", "error");
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = "Send Tip";
  }
});

// ─── Quick Amounts ──────────────────────────────────────────────────────────
document.querySelectorAll(".quick-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".quick-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    amountInput.value = btn.dataset.amount;
  });
});

// ─── Discovery ───────────────────────────────────────────────────────────────
async function fetchTrendingCreators() {
  show(discoveryLoading);
  hide(creatorList);
  hide(discoveryEmpty);

  try {
    // We'll use the leaderboard or a general creators endpoint
    // Fallback to mock if API fails
    const res = await chrome.runtime.sendMessage({ type: "GET_CREATORS_DISCOVERY" });
    
    hide(discoveryLoading);
    if (res && res.creators && res.creators.length > 0) {
      renderCreatorList(res.creators);
      show(creatorList);
    } else {
      show(discoveryEmpty);
    }
  } catch (e) {
    hide(discoveryLoading);
    show(discoveryEmpty);
  }
}

function renderCreatorList(creators) {
  creatorList.innerHTML = "";
  creators.forEach(c => {
    const item = document.createElement("div");
    item.className = "creator-item";
    item.innerHTML = `
      <div class="creator-item-avatar">${c.username.charAt(0).toUpperCase()}</div>
      <div class="creator-item-info">
        <h3>${c.displayName || `@${c.username}`}</h3>
        <p>@${c.username}${c.categories ? ` • ${c.categories[0]}` : ""}</p>
      </div>
    `;
    item.addEventListener("click", () => {
      currentCreator = { ...c, source: "Discovered" };
      switchTab("tip");
      renderMain();
    });
    creatorList.appendChild(item);
  });
}

searchInput.addEventListener("input", debounce(async (e) => {
  const query = e.target.value.trim();
  if (!query) {
    fetchTrendingCreators();
    return;
  }

  show(discoveryLoading);
  hide(creatorList);
  
  try {
    const res = await chrome.runtime.sendMessage({ 
      type: "SEARCH_CREATORS", 
      payload: { query } 
    });
    hide(discoveryLoading);
    if (res && res.creators && res.creators.length > 0) {
      renderCreatorList(res.creators);
      show(creatorList);
    } else {
      show(discoveryEmpty);
    }
  } catch (e) {
    hide(discoveryLoading);
    show(discoveryEmpty);
  }
}, 300));

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// ─── Init ─────────────────────────────────────────────────────────────────────
async function init() {
  // Load settings
  chrome.storage.local.get({ defaultAmount: "5", preferredAsset: "XLM" }, (res) => {
    settings = res;
    amountInput.value = settings.defaultAmount;
  });

  const walletRes = await chrome.runtime.sendMessage({ type: "GET_WALLET_STATE" });
  if (walletRes && walletRes.connected) {
    walletState = { connected: true, publicKey: walletRes.publicKey, balance: walletRes.balance };
  }

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) {
      const creatorRes = await chrome.tabs.sendMessage(tab.id, { type: "GET_DETECTED_CREATORS" });
      if (creatorRes?.creators?.length > 0) {
        currentCreator = creatorRes.creators[0];
      }
    }
  } catch (e) {}

  renderWallet();
}

init();
