/**
 * Stellar TipJar - Content Script
 * Detects creator links/profiles on any page and injects quick-tip buttons.
 */

(function () {
  "use strict";

  const SITE_URL = "https://stellar-tipjar.app";
  const API_BASE = "http://localhost:8000";

  // Patterns that indicate a creator profile link
  const CREATOR_LINK_PATTERNS = [
    /stellar-tipjar\.app\/creator\/([a-zA-Z0-9][a-zA-Z0-9_-]{1,31})/,
    /stellar-tipjar\.app\/@([a-zA-Z0-9][a-zA-Z0-9_-]{1,31})/,
    // Support for potential partner sites
    /linktree\.ee\/([a-zA-Z0-9][a-zA-Z0-9_-]{1,31})/,
    /twitter\.com\/([a-zA-Z0-9][a-zA-Z0-9_-]{1,15})/,
    /x\.com\/([a-zA-Z0-9][a-zA-Z0-9_-]{1,15})/,
    /github\.com\/([a-zA-Z0-9][a-zA-Z0-9_-]{1,38})/,
  ];

  // Specific selectors for social media profiles to extract username
  const SOCIAL_SELECTORS = {
    'twitter.com': () => {
      const parts = window.location.pathname.split('/');
      return parts.length === 2 && !['explore', 'home', 'notifications', 'messages'].includes(parts[1]) ? parts[1] : null;
    },
    'github.com': () => {
      const parts = window.location.pathname.split('/');
      return parts.length === 2 && !['trending', 'explore', 'marketplace'].includes(parts[1]) ? parts[1] : null;
    }
  };

  let detectedCreators = [];
  let injectedButtons = new WeakSet();

  // ─── Creator detection ──────────────────────────────────────────────────────

  function detectFromCurrentUrl() {
    const hostname = window.location.hostname;
    if (SOCIAL_SELECTORS[hostname]) {
      const username = SOCIAL_SELECTORS[hostname]();
      if (username) return { username, source: `${hostname} profile`, displayName: null };
    }

    const username = extractUsernameFromUrl(window.location.href);
    if (username) return { username, source: "Current page URL", displayName: null };
    return null;
  }

  function detectFromLinks() {
    const found = [];
    const links = document.querySelectorAll("a[href]");

    links.forEach((link) => {
      const href = link.href;
      const username = extractUsernameFromUrl(href);
      if (!username) return;

      // Avoid duplicates
      if (found.some((c) => c.username === username)) return;

      found.push({
        username,
        source: `Link on page: ${link.textContent.trim().slice(0, 40) || href}`,
        displayName: link.textContent.trim() || null,
        element: link,
      });
    });

    return found;
  }

  function runDetection() {
    const creators = [];

    // 1. Check meta tags (highest confidence — page explicitly declares creator)
    const metaCreator = detectFromMeta();
    if (metaCreator) creators.push(metaCreator);

    // 2. Check current URL
    const urlCreator = detectFromCurrentUrl();
    if (urlCreator && !creators.some((c) => c.username === urlCreator.username)) {
      creators.push(urlCreator);
    }

    // 3. Scan all links on the page
    const linkCreators = detectFromLinks();
    linkCreators.forEach((c) => {
      if (!creators.some((existing) => existing.username === c.username)) {
        creators.push(c);
      }
    });

    detectedCreators = creators;
    return creators;
  }

  // ─── Quick-tip button injection ─────────────────────────────────────────────

  function createTipButton(username) {
    const btn = document.createElement("button");
    btn.className = "stellar-tipjar-btn";
    btn.setAttribute("aria-label", `Tip @${username} with Stellar XLM`);
    btn.setAttribute("title", `Tip @${username} with Stellar XLM`);
    btn.innerHTML = `⭐ Tip`;
    btn.style.cssText = `
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: linear-gradient(135deg, #7c3aed, #2563eb);
      border: none;
      border-radius: 6px;
      color: #fff;
      cursor: pointer;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 12px;
      font-weight: 500;
      margin-left: 6px;
      padding: 4px 10px;
      vertical-align: middle;
      transition: opacity 0.15s;
      z-index: 9999;
    `;

    btn.addEventListener("mouseenter", () => { btn.style.opacity = "0.85"; });
    btn.addEventListener("mouseleave", () => { btn.style.opacity = "1"; });

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      showQuickTipOverlay(username);
    });

    return btn;
  }

  function injectTipButtons() {
    const links = document.querySelectorAll("a[href]");
    links.forEach((link) => {
      if (injectedButtons.has(link)) return;
      const username = extractUsernameFromUrl(link.href);
      if (!username) return;

      injectedButtons.add(link);
      const btn = createTipButton(username);
      link.insertAdjacentElement("afterend", btn);
    });
  }

  // ─── Quick-tip overlay ──────────────────────────────────────────────────────

  let overlayEl = null;

  function showQuickTipOverlay(username) {
    removeOverlay();

    const overlay = document.createElement("div");
    overlay.id = "stellar-tipjar-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", `Tip @${username}`);
    overlay.innerHTML = `
      <div style="
        background: #0b0b14;
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 20px;
        box-shadow: 0 24px 64px rgba(0,0,0,0.8);
        color: #e8e8f0;
        max-width: 360px;
        padding: 24px;
        position: relative;
        width: 90vw;
        backdrop-filter: blur(20px);
      ">
        <button id="stj-close" aria-label="Close" style="
          background: rgba(255,255,255,0.05);
          border: none;
          border-radius: 50%;
          color: rgba(255,255,255,0.4);
          cursor: pointer;
          font-size: 18px;
          height: 32px;
          width: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          right: 16px;
          top: 16px;
          transition: all 0.2s;
        ">×</button>

        <div style="display:flex;align-items:center;gap:14px;margin-bottom:24px;">
          <div style="
            background: linear-gradient(135deg,#7c3aed,#2563eb);
            border-radius: 12px;
            font-size: 20px;
            height: 48px;
            width: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 20px rgba(124,58,237,0.3);
          ">⭐</div>
          <div>
            <div style="font-size:17px;font-weight:700;">Tip @${username}</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.4);">via accounts on Stellar</div>
          </div>
        </div>

        <div id="stj-wallet-check" style="text-align:center;padding:20px 0;color:rgba(255,255,255,0.5);font-size:14px;">
          <div class="stj-spinner" style="
            width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.1);
            border-top-color: #7c3aed; border-radius: 50%; margin: 0 auto 12px;
            animation: stj-spin 0.8s linear infinite;
          "></div>
          Checking wallet...
        </div>

        <div id="stj-form" style="display:none;">
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:20px;">
            <button class="stj-quick" data-amount="1" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#e8e8f0;cursor:pointer;font-size:12px;padding:10px 4px;font-weight:600;">1</button>
            <button class="stj-quick" data-amount="5" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#e8e8f0;cursor:pointer;font-size:12px;padding:10px 4px;font-weight:600;">5</button>
            <button class="stj-quick" data-amount="10" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#e8e8f0;cursor:pointer;font-size:12px;padding:10px 4px;font-weight:600;">10</button>
            <button class="stj-quick" data-amount="25" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#e8e8f0;cursor:pointer;font-size:12px;padding:10px 4px;font-weight:600;">25</button>
          </div>

          <div style="margin-bottom:16px;">
            <label style="display:block;font-size:11px;color:rgba(255,255,255,0.4);margin-bottom:8px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;">Amount (XLM)</label>
            <input id="stj-amount" type="number" min="0.01" step="0.01" value="5" style="
              width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);
              border-radius:12px;color:#fff;font-size:15px;padding:12px 14px;outline:none;box-sizing:border-box;
              transition: border-color 0.2s;
            " />
          </div>

          <div style="margin-bottom:24px;">
            <label style="display:block;font-size:11px;color:rgba(255,255,255,0.4);margin-bottom:8px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;">Message (optional)</label>
            <input id="stj-message" type="text" maxlength="500" placeholder="Great work!" style="
              width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);
              border-radius:12px;color:#fff;font-size:15px;padding:12px 14px;outline:none;box-sizing:border-box;
              transition: border-color 0.2s;
            " />
          </div>

          <button id="stj-send" style="
            background:linear-gradient(135deg,#7c3aed,#2563eb);
            border:none;border-radius:12px;color:#fff;cursor:pointer;
            font-size:15px;font-weight:700;padding:14px;width:100%;
            box-shadow: 0 4px 15px rgba(124,58,237,0.3);
            transition: all 0.2s;
          ">Send ${username} XLM</button>

          <div id="stj-status" style="display:none;border-radius:12px;font-size:13px;margin-top:16px;padding:12px;text-align:center;"></div>
        </div>

        <style>
          @keyframes stj-spin { to { transform: rotate(360deg); } }
          #stj-close:hover { background: rgba(255,255,255,0.15) !important; color: #fff !important; }
          #stj-send:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(124,58,237,0.4) !important; }
          #stj-send:active { transform: translateY(0); }
          #stj-amount:focus, #stj-message:focus { border-color: #7c3aed !important; }
        </style>

        <div id="stj-no-wallet" style="display:none;text-align:center;padding:10px 0;">
          <div style="font-size:32px;margin-bottom:12px;">🔗</div>
          <div style="font-size:14px;color:rgba(255,255,255,0.6);margin-bottom:20px;line-height:1.5;">Connect your Freighter wallet to tip creators directly.</div>
          <a href="https://www.freighter.app" target="_blank" style="
            background:linear-gradient(135deg,#7c3aed,#2563eb);
            border-radius:12px;color:#fff;display:inline-block;
            font-size:14px;font-weight:700;padding:12px 24px;text-decoration:none;
            box-shadow: 0 4px 15px rgba(124,58,237,0.3);
          ">Get Freighter</a>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    overlayEl = overlay;

    // Close handlers
    overlay.querySelector("#stj-close").addEventListener("click", removeOverlay);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) removeOverlay(); });
    document.addEventListener("keydown", handleEscKey);

    // Quick amount buttons
    overlay.querySelectorAll(".stj-quick").forEach((btn) => {
      btn.addEventListener("click", () => {
        overlay.querySelectorAll(".stj-quick").forEach((b) => {
          b.style.background = "rgba(255,255,255,0.05)";
          b.style.borderColor = "rgba(255,255,255,0.1)";
          b.style.color = "#e8e8f0";
        });
        btn.style.background = "rgba(124,58,237,0.2)";
        btn.style.borderColor = "rgba(124,58,237,0.5)";
        btn.style.color = "#c4b5fd";
        overlay.querySelector("#stj-amount").value = btn.dataset.amount;
      });
    });

    // Send tip
    overlay.querySelector("#stj-send").addEventListener("click", () => {
      handleOverlaySend(username, overlay);
    });

    // Check wallet state
    chrome.runtime.sendMessage({ type: "GET_WALLET_STATE" }, (res) => {
      const walletCheck = overlay.querySelector("#stj-wallet-check");
      const form = overlay.querySelector("#stj-form");
      const noWallet = overlay.querySelector("#stj-no-wallet");

      walletCheck.style.display = "none";
      if (res && res.connected) {
        form.style.display = "block";
      } else {
        noWallet.style.display = "block";
      }
    });
  }

  async function handleOverlaySend(username, overlay) {
    const amount = parseFloat(overlay.querySelector("#stj-amount").value);
    const message = overlay.querySelector("#stj-message").value.trim();
    const sendBtn = overlay.querySelector("#stj-send");
    const statusEl = overlay.querySelector("#stj-status");

    if (!amount || amount < 0.01) {
      showOverlayStatus(statusEl, "Minimum tip is 0.01 XLM.", "error");
      return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = "Sending...";
    statusEl.style.display = "none";

    chrome.runtime.sendMessage(
      {
        type: "SEND_TIP",
        payload: { username, amount: amount.toString(), assetCode: "XLM", message: message || undefined },
      },
      (res) => {
        sendBtn.disabled = false;
        sendBtn.textContent = "Send Tip";
        if (res && res.error) {
          showOverlayStatus(statusEl, res.error, "error");
        } else if (res && res.intentId) {
          showOverlayStatus(statusEl, "Tip sent successfully!", "success");
          setTimeout(removeOverlay, 2000);
        } else {
          showOverlayStatus(statusEl, "Something went wrong. Try again.", "error");
        }
      }
    );
  }

  function showOverlayStatus(el, message, type) {
    el.textContent = message;
    el.style.display = "block";
    if (type === "success") {
      el.style.background = "rgba(34,197,94,0.1)";
      el.style.border = "1px solid rgba(34,197,94,0.25)";
      el.style.color = "#86efac";
    } else {
      el.style.background = "rgba(239,68,68,0.1)";
      el.style.border = "1px solid rgba(239,68,68,0.25)";
      el.style.color = "#fca5a5";
    }
  }

  function removeOverlay() {
    if (overlayEl) {
      overlayEl.remove();
      overlayEl = null;
    }
    document.removeEventListener("keydown", handleEscKey);
  }

  function handleEscKey(e) {
    if (e.key === "Escape") removeOverlay();
  }

  // ─── Message listener ────────────────────────────────────────────────────────
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.type === "GET_DETECTED_CREATORS") {
      runDetection();
      sendResponse({ creators: detectedCreators });
      return true;
    }
  });

  // ─── Init ────────────────────────────────────────────────────────────────────
  function init() {
    runDetection();
    injectTipButtons();

    // Watch for dynamic content (SPAs)
    const observer = new MutationObserver(() => {
      runDetection();
      injectTipButtons();
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
