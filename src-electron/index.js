const path = require("path");
const { Worker } = require("worker_threads");

process.chdir(path.join(__dirname, ".."));
new Worker(
  path.join(__dirname, "../node_modules/@strapi/strapi/bin/strapi.js"),
  {
    argv: ["start"],
    // argv: process.argv.slice(2),
  }
);
