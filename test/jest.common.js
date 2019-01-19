/* eslint-env node */

const path = require("path");

module.exports = {
  rootDir: path.join(__dirname, ".."),
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  modulePaths: ["src"],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ]
};
