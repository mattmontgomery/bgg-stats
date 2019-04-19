require("@babel/register")({
  presets: [
    [
      "@babel/env",
      {
        targets: {
          node: true
        }
      }
    ],
    "@babel/typescript"
  ],
  plugins: [
    "@babel/plugin-transform-modules-commonjs",
    "@babel/plugin-transform-typescript",
    "@babel/plugin-transform-async-to-generator",
    "@babel/plugin-transform-runtime"
  ],
  extensions: [".js", ".ts"],
  ignore: [/node_modules\/(?!@babel\/runtime\/helpers)/]
});

// Import the rest of our application.
module.exports = require("./server.js");
