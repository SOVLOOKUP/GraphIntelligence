const path = require("path");
const { Worker } = require("worker_threads");

process.chdir(__dirname);

new Worker(path.join(__dirname, "node_modules/@strapi/strapi/bin/strapi.js"), {
  argv: process.argv.slice(2),
});
