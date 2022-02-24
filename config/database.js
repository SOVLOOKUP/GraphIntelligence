const path = require('path');
const os = require("os");

module.exports = ({ env }) => ({
  connection: {
    client: "sqlite",
    connection: {
      filename: path.join(os.homedir(), "gi", "data.db"),
    },
    useNullAsDefault: true,
  },
});
