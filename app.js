require("./src-electron");
const { app, BrowserWindow } = require("electron");
const waitOn = require("wait-on");

async function createWindow() {
  const win = new BrowserWindow({
    show: false,
    height: 10000,
    width: 10000,
    autoHideMenuBar: true,
  });
  return win;
}

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

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
