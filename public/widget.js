/**
 * Stellar Tip Jar — Standalone Widget Script
 *
 * Usage:
 *   <div
 *     data-stellar-tip
 *     data-username="alice"
 *     data-type="button"           <!-- "button" | "card" (default: "button") -->
 *     data-label="Tip Me ⭐"
 *     data-color="#0f6c7b"
 *     data-size="md"               <!-- "sm" | "md" | "lg" -->
 *     data-compact="false"
 *     data-show-message="true"
 *     data-asset="XLM"
 *   ></div>
 *   <script src="https://your-domain.com/widget.js" async></script>
 */
(function () {
  "use strict";

  var BASE_URL =
    (document.currentScript && document.currentScript.src
      ? new URL(document.currentScript.src).origin
      : window.location.origin);

  function buildIframe(el) {
    var username = el.getAttribute("data-username") || "creator";
    var type = el.getAttribute("data-type") || "button";
    var label = el.getAttribute("data-label") || "Send a Tip \u2B50";
    var color = el.getAttribute("data-color") || "#0f6c7b";
    var size = el.getAttribute("data-size") || "md";
    var compact = el.getAttribute("data-compact") || "false";
    var showMessage = el.getAttribute("data-show-message") || "true";
    var asset = el.getAttribute("data-asset") || "XLM";
    var displayName = el.getAttribute("data-display-name") || "";
    var bio = el.getAttribute("data-bio") || "";

    var params = new URLSearchParams({
      username: username,
      type: type,
      accentColor: color,
      label: label,
      size: size,
      compact: compact,
      showMessage: showMessage,
      defaultAsset: asset,
      displayName: displayName,
      bio: bio,
    });

    var isButton = type === "button";
    var sizeHeights = { sm: 40, md: 50, lg: 60 };
    var width = isButton ? 220 : 380;
    var height = isButton
      ? (sizeHeights[size] || 50)
      : compact === "true"
      ? 220
      : showMessage === "true"
      ? 400
      : 320;

    var iframe = document.createElement("iframe");
    iframe.src = BASE_URL + "/widgets/embed?" + params.toString();
    iframe.width = String(width);
    iframe.height = String(height);
    iframe.frameBorder = "0";
    iframe.scrolling = "no";
    iframe.title = "Tip " + username + " on Stellar Tip Jar";
    iframe.loading = "lazy";
    iframe.style.cssText = "border:none;overflow:hidden;display:block;";
    iframe.setAttribute("sandbox", "allow-scripts allow-forms allow-same-origin allow-popups");

    el.appendChild(iframe);
  }

  function init() {
    var targets = document.querySelectorAll("[data-stellar-tip]");
    for (var i = 0; i < targets.length; i++) {
      buildIframe(targets[i]);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
