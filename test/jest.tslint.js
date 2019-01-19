/* eslint-env node */

const { rootDir } = require("./jest.common");

module.exports = {
  rootDir,
  displayName: "tslint",
  runner: "jest-runner-tslint",
  testMatch: ["<rootDir>/src/**/*"],
  moduleFileExtensions: ["ts", "tsx"]
};
