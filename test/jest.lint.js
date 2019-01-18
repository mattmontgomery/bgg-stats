/* eslint-env node */

const { rootDir } = require("./jest.common");

module.exports = {
  rootDir,
  displayName: "lint",
  runner: "jest-runner-eslint",
  testMatch: ["<rootDir>/src/**/*.{js,jsx}"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/coverage/",
    "/vendor/",
    "/web/assets/",
    "/web/bundles/"
  ]
};
