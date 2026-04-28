# Desktop App (Electron) — #380

This document outlines the architecture and implementation plan for wrapping Stellar Tip Jar in an Electron desktop application.

## Overview

The desktop app is a separate project that loads the Next.js web app inside an Electron `BrowserWindow`. It should live in its own repository (`stellar-tipjar-desktop`) rather than inside this Next.js repo to keep build toolchains isolated.

## Repository Structure

```
stellar-tipjar-desktop/
├── src/
│   ├── main.ts          # Electron main process
│   ├── preload.ts       # Preload script (context bridge)
│   └── tray.ts          # System tray logic
├── resources/
│   ├── icon.png
│   ├── icon.icns        # macOS
│   └── icon.ico         # Windows
├── electron-builder.yml
├── package.json
└── tsconfig.json
```

## Setup

```bash
npm init -y
npm install --save-dev electron electron-builder typescript ts-node
```

`package.json` scripts:

```json
{
  "scripts": {
    "dev": "electron .",
    "build": "electron-builder",
    "build:mac": "electron-builder --mac",
    "build:win": "electron-builder --win",
    "build:linux": "electron-builder --linux"
  }
}
```

## Main Process

```ts
// src/main.ts
import { app, BrowserWindow, Menu, Tray, nativeImage } from "electron";
import path from "path";

const WEB_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://stellartipjar.app";

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    titleBarStyle: "hiddenInset", // macOS native feel
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
    icon: path.join(__dirname, "../resources/icon.png"),
  });

  mainWindow.loadURL(WEB_URL);
}

function createTray() {
  const icon = nativeImage.createFromPath(
    path.join(__dirname, "../resources/icon.png")
  );
  tray = new Tray(icon.resize({ width: 16 }));
  tray.setToolTip("Stellar Tip Jar");
  tray.setContextMenu(
    Menu.buildFromTemplate([
      { label: "Open", click: () => mainWindow?.show() },
      { type: "separator" },
      { label: "Quit", role: "quit" },
    ])
  );
  tray.on("click", () => mainWindow?.show());
}

app.whenReady().then(() => {
  createWindow();
  createTray();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
```

## Native Menu

```ts
// src/main.ts (continued)
import { Menu } from "electron";

const menuTemplate: Electron.MenuItemConstructorOptions[] = [
  {
    label: "Stellar Tip Jar",
    submenu: [
      { role: "about" },
      { type: "separator" },
      { role: "quit" },
    ],
  },
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "toggleDevTools" },
      { type: "separator" },
      { role: "resetZoom" },
      { role: "zoomIn" },
      { role: "zoomOut" },
      { type: "separator" },
      { role: "togglefullscreen" },
    ],
  },
];

Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
```

## System Notifications

```ts
// src/preload.ts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  showNotification: (title: string, body: string) =>
    ipcRenderer.send("show-notification", { title, body }),
});
```

```ts
// src/main.ts — IPC handler
import { ipcMain, Notification } from "electron";

ipcMain.on("show-notification", (_event, { title, body }) => {
  new Notification({ title, body }).show();
});
```

In the web app, call `window.electronAPI?.showNotification(...)` when a tip is received.

## Auto-Updates

Use `electron-updater` (part of `electron-builder`):

```ts
import { autoUpdater } from "electron-updater";

app.whenReady().then(() => {
  autoUpdater.checkForUpdatesAndNotify();
});

autoUpdater.on("update-available", () => {
  mainWindow?.webContents.send("update-available");
});

autoUpdater.on("update-downloaded", () => {
  autoUpdater.quitAndInstall();
});
```

`electron-builder.yml`:

```yaml
appId: app.stellartipjar.desktop
productName: Stellar Tip Jar
publish:
  provider: github
  owner: Bonizozo
  repo: stellar-tipjar-desktop
mac:
  category: public.app-category.finance
  target: [dmg, zip]
win:
  target: [nsis, portable]
linux:
  target: [AppImage, deb]
```

## Security Checklist

- `contextIsolation: true` — always on
- `nodeIntegration: false` — always off
- `sandbox: true` — enable for renderer processes
- Validate all IPC message payloads
- Use `will-navigate` and `new-window` events to block unexpected navigation
- Pin Electron version in `package.json` and audit regularly

## Development Workflow

1. Run the Next.js dev server: `npm run dev` (in this repo)
2. Run Electron pointing at localhost: `NODE_ENV=development electron .` (in desktop repo)
3. For production builds, set `WEB_URL` to the deployed app URL or bundle the Next.js export

## Related

- [Electron docs](https://www.electronjs.org/docs/latest)
- [electron-builder docs](https://www.electron.build)
- PWA alternative: see `docs/PWA.md` — the existing PWA already provides installable desktop-like behavior with zero extra tooling
