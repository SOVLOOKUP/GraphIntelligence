const { app, BrowserWindow, Notification } = require("electron");
const waitOn = require("wait-on");
const path = require("path");
const fs = require("fs");
const { Worker } = require("worker_threads");
const { autoUpdater } = require("electron-updater");
autoUpdater.checkForUpdatesAndNotify({
  title: "更新程序",
  body: "检测到更新, 是否下载?",
});
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

const normalArgNum = !app.isPackaged ? 2 : 1;
const nodeMode = process.argv.length > normalArgNum;

async function createWindow() {
  const win = new BrowserWindow({
    show: false,
    height: 10000,
    width: 10000,
    autoHideMenuBar: true,
    webPreferences: {},
  });
  return win;
}

const args = process.argv.slice(normalArgNum);
const first = path.resolve(process.cwd(), args[0] ?? "");

if (args[0] === "-h") {
  console.log("App version:", app.getVersion());
  console.log("Electron version:", process.versions.electron);
  console.log("Chrome version:", process.versions.chrome);
  console.log("Node.js version:", process.version);
  process.exit();
}

(async () => {
  if (nodeMode && fs.existsSync(first)) {
    // 当传入参数时模仿 Node 的行为, 使 execa 正常工作
    new Worker(first, {
      argv: args.slice(1),
    }).on("exit", () => {
      process.exit();
    });
  } else {
    app.whenReady().then(async () => {
      const w = await createWindow();
      if (!app.isPackaged) w.webContents.openDevTools({ mode: "detach" });
      await w.loadFile("static/loading.html");
      w.show();

      await waitOn({
        resources: ["http://localhost:1337"],
        // 五分钟后超时
        timeout: 300000,
      });
      // 等待strapi启动后启动窗口
      await w.loadURL("https://gi.lingthink.com");
    });
    
    const start = require("./bin/app").default
    start(Notification)
  }
})();
