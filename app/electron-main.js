const {
  app,
  BrowserWindow,
  ipcMain,
  ipcRenderer,
  Notification,
} = require("electron");
const { autoUpdater, AppUpdater } = require("electron-updater");
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      //preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("./screens/main/main.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length == 0) createWindow();
  });

  autoUpdater.checkForUpdates();
  console.log(`Checking for updates. Current version ${app.getVersion()}`);
});

autoUpdater.on("update-available", (info) => {
  console.log(`Update available. Current version ${app.getVersion()}`);
  const customNotification = new Notification({
    title: "KhateRaho Notification",
    subtitle: "KhateRaho POS Notification",
    body: "KhateRaho Update available",
    silent: false,

    timeoutType: "default",
    urgency: "critical",
  });
  customNotification.show();
  autoUpdater.downloadUpdate();
});

autoUpdater.on("update-not-available", (info) => {
  console.log(`No update available. Current version ${app.getVersion()}`);
});

autoUpdater.on("update-downloaded", (info) => {
  const customNotification = new Notification({
    title: "KhateRaho Notification",
    subtitle: "KhateRaho POS Notification",
    body: "KhateRaho Update Downloaded",
    silent: false,

    timeoutType: "default",
    urgency: "critical",
  });
  customNotification.show();
});

autoUpdater.on("error", (info) => {
  console.log(info);
  const customNotification = new Notification({
    title: "KhateRaho Notification",
    subtitle: "KhateRaho POS Notification",
    body: `${info}`,
    silent: false,

    timeoutType: "default",
    urgency: "critical",
  });
  customNotification.show();
});

//Global exception handler
process.on("uncaughtException", function (err) {
  console.log(err);
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
