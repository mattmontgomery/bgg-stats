/* eslint-env node */

const { rootDir } = require("./jest.common");

module.exports = {
  rootDir,
  displayName: "eslint",
  runner: "jest-runner-eslint",
  testMatch: ["<rootDir>/src/**/*.{js,jsx,ts,tsx}"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/coverage/",
    "/vendor/",
    "/web/assets/",
    "/web/bundles/"
  ]
};
