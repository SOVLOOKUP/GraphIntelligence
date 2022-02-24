const path = require("path");
const os = require("os");
const fs = require("fs");
const execPath = path.resolve(__dirname, "..");
const appDataDir = path.resolve(os.homedir(), "gi");
// 数据目录
const dataPath = path.resolve(appDataDir, "data.db");
// 日志目录
const logDirPath = path.resolve(appDataDir, "log");
if (!fs.existsSync(logDirPath)) fs.mkdirSync(logDirPath, { recursive: true });
// 日志文件
const logPath = path.resolve(logDirPath, `log-${Date.now()}.txt`);
if (!fs.existsSync(logPath)) fs.writeFileSync(logPath, "");
// 日志流
const logStream = fs.createWriteStream(logPath, "utf8");

const start = async (Notification) => {
  console.log("App running at =>", execPath);
  const { execaNode } = await import("execa");
  process.chdir(execPath);
  // 如果数据不存在则进行初始化
  if (!fs.existsSync(dataPath)) {
    new Notification({
      title: "欢迎使用 GraphIntelligence 知识图谱系统",
      body: "第一次启动时间较长, 请您耐心等待, 初始化完成后将自动打开后台管理界面",
    }).show();
    const { stderr } = await execaNode(
      path.resolve(
        execPath,
        "node_modules/strapi-plugin-config-sync/server/cli.js"
      ),
      ["import", "-y"],
      {
        execPath,
        stdout: logStream,
      }
    );
    console.log(stderr);
  }

  await execaNode(
    path.resolve(execPath, "node_modules/@strapi/strapi/bin/strapi.js"),
    ["dev"],
    {
      execPath,
      stdout: logStream,
    }
  );
}

exports.default = start
