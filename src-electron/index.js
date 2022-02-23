const path = require("path");
const os = require("os");
const { Worker } = require("worker_threads");
const fs = require("fs");

process.chdir(path.join(__dirname, ".."));

const dbInitPath = path.join(__dirname, "../static/data.db");
const dataPath = path.join(os.homedir(), "gi");

// 确认数据文件夹存在
if (!fs.existsSync(dataPath)) {
  fs.mkdirSync(dataPath);
}

// 如果数据库不存在则初始化
if (!fs.existsSync(path.join(dataPath, "data.db"))) {
  fs.copyFileSync(dbInitPath, path.join(dataPath, "data.db"));
}

new Worker(
  path.join(__dirname, "../node_modules/@strapi/strapi/bin/strapi.js"),
  {
    argv: ["start"],
    // argv: process.argv.slice(2),
  }
);
