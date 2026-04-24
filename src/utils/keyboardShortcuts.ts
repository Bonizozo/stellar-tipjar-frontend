/**
 * Keyboard Shortcuts Utility
 * Define and manage keyboard shortcuts for accessibility
 */

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  callback: () => void;
}

class KeyboardShortcutsManager {
  private shortcuts: Map<string, KeyboardShortcut> = new Map();
  private isEnabled = true;

  register(shortcut: KeyboardShortcut): void {
    const key = this.getShortcutKey(shortcut);
    this.shortcuts.set(key, shortcut);
  }

  unregister(shortcut: Partial<KeyboardShortcut>): void {
    const key = this.getShortcutKey(shortcut as KeyboardShortcut);
    this.shortcuts.delete(key);
  }

  enable(): void {
    this.isEnabled = true;
  }

  disable(): void {
    this.isEnabled = false;
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (!this.isEnabled) return;

    const shortcutKey = this.getShortcutKeyFromEvent(event);

    this.shortcuts.forEach((shortcut, key) => {
      if (key === shortcutKey) {
        event.preventDefault();
        shortcut.callback();
      }
    });
  }

  private getShortcutKey(shortcut: KeyboardShortcut): string {
    const parts = [];
    if (shortcut.ctrl) parts.push('ctrl');
    if (shortcut.shift) parts.push('shift');
    if (shortcut.alt) parts.push('alt');
    if (shortcut.meta) parts.push('meta');
    parts.push(shortcut.key.toLowerCase());
    return parts.join('+');
  }

  private getShortcutKeyFromEvent(event: KeyboardEvent): string {
    const parts = [];
    if (event.ctrlKey || event.metaKey) parts.push('ctrl');
    if (event.shiftKey) parts.push('shift');
    if (event.altKey) parts.push('alt');
    if (event.metaKey && !event.ctrlKey) parts.push('meta');
    parts.push(event.key.toLowerCase());
    return parts.join('+');
  }

  getShortcuts(): KeyboardShortcut[] {
    return Array.from(this.shortcuts.values());
  }
}

export const keyboardShortcutsManager = new KeyboardShortcutsManager();

// Common accessibility shortcuts
export const ACCESSIBILITY_SHORTCUTS = {
  SKIP_TO_CONTENT: { key: 's' },
  FOCUS_SEARCH: { key: '/', ctrl: false },
  SEND_TIP: { key: 't' },
  OPEN_MENU: { key: 'm' },
  TOGGLE_VOICE: { key: 'v', ctrl: true },
  CLOSE_DIALOG: { key: 'Escape' },
};
