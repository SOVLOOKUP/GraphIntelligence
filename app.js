const path = require("path");
const { Worker } = require("worker_threads");

exports.default = () => {
  process.chdir(__dirname);
  new Worker(
    path.join(__dirname, "node_modules/@strapi/strapi/bin/strapi.js"),
    {
      argv: ["dev"],
      // argv: process.argv.slice(2),
    }
  );
};
