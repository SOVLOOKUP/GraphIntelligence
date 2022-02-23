const path = require("path");
const os = require("os");
const fs = require("fs");

const execPath = path.join(__dirname, "..");
const dataPath = path.join(os.homedir(), "gi", "data.db");
// const dbInitPath = path.join(__dirname, "../static/data.db");

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
        stdout: process.stdout,
      }
    );
  }

  await execaNode(
    path.join(__dirname, "../node_modules/@strapi/strapi/bin/strapi.js"),
    ["start"],
    {
      execPath,
      stdout: process.stdout,
    }
  );
})();

