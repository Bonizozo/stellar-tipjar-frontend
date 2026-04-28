// Options page logic
document.addEventListener('DOMContentLoaded', () => {
  const defaultAmountInput = document.getElementById('default-amount');
  const preferredAssetInput = document.getElementById('preferred-asset');
  const showButtonsCheckbox = document.getElementById('show-buttons');
  const saveBtn = document.getElementById('save');
  const statusEl = document.getElementById('status');

  // Load saved options
  chrome.storage.local.get({
    defaultAmount: '5',
    preferredAsset: 'XLM',
    showButtons: true
  }, (items) => {
    defaultAmountInput.value = items.defaultAmount;
    preferredAssetInput.value = items.preferredAsset;
    showButtonsCheckbox.checked = items.showButtons;
  });

  // Save options
  saveBtn.addEventListener('click', () => {
    const defaultAmount = defaultAmountInput.value;
    const preferredAsset = preferredAssetInput.value || 'XLM';
    const showButtons = showButtonsCheckbox.checked;

    chrome.storage.local.set({
      defaultAmount,
      preferredAsset,
      showButtons
    }, () => {
      // Update UI to let user know options were saved
      statusEl.style.opacity = '1';
      statusEl.className = 'success';
      statusEl.textContent = 'Settings saved!';
      
      setTimeout(() => {
        statusEl.style.opacity = '0';
      }, 2000);
    });
  });
});
