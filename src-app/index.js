const path = require("path");
const os = require("os");
const fs = require("fs");
const execPath = path.join(__dirname, "..");
const appDataDir = path.join(os.homedir(), "gi");
// 数据目录
const dataPath = path.join(appDataDir, "data.db");
// 日志目录
const logDirPath = path.join(appDataDir, "log");
if (!fs.existsSync(logDirPath)) fs.mkdirSync(logDirPath, { recursive: true });
// 日志文件
const logPath = path.join(logDirPath, `log-${Date.now()}.txt`);
if (!fs.existsSync(logPath)) fs.writeFileSync(logPath, "");
// 日志流
const logStream = fs.createWriteStream(logPath, "utf8");

(async () => {
  const { execaNode } = await import("execa");
  // 如果数据不存在则进行初始化
  if (!fs.existsSync(dataPath)) {
    await execaNode(
      path.join(
        __dirname,
        "../node_modules/strapi-plugin-config-sync/server/cli.js"
      ),
      ["import", "-y"],
      {
        execPath,
        stdout: logStream,
      }
    );
  }

  await execaNode(
    path.join(__dirname, "../node_modules/@strapi/strapi/bin/strapi.js"),
    ["start"],
    {
      execPath,
      stdout: logStream,
    }
  );
})();

