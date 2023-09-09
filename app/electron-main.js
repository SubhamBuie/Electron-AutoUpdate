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

  // Load the index.html of the app.
  win.loadFile("./screens/main/main.html");

  // Open the DevTools.
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.whenReady().then(createWindow);
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length == 0) createWindow();
  });

  autoUpdater.checkForUpdates();
  console.log(`Checking for updates. Current version ${app.getVersion()}`);
});

autoUpdater.on("update-available", (info) => {
  //   curWindow.showMessage(
  //     `Update available. Current version ${app.getVersion()}`
  //   );
  console.log(`Update available. Current version ${app.getVersion()}`);
  autoUpdater.downloadUpdate();
  //curWindow.showMessage(pth);
});

autoUpdater.on("update-not-available", (info) => {
  //   curWindow.showMessage(
  //     `No update available. Current version ${app.getVersion()}`
  //   );
  console.log(`No update available. Current version ${app.getVersion()}`);
});

/*Download Completion Message*/
autoUpdater.on("update-downloaded", (info) => {
  //   curWindow.showMessage(
  //     `Update downloaded. Current version ${app.getVersion()}`
  //   );
  console.log(`Update downloaded. Current version ${app.getVersion()}`);
});

autoUpdater.on("error", (info) => {
  //   curWindow.showMessage(info);
  console.log(info);
});

//Global exception handler
process.on("uncaughtException", function (err) {
  console.log(err);
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their
  // menu bar to stay active until the user quits
  // explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// app.on("activate", () => {
//   // On macOS it's common to re-create a window in the
//   // app when the dock icon is clicked and there are
//   // no other windows open.
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });
