const path = require("path");
const fs = require("fs");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const getEntries = (srcDir) => {
  const entries = {};
  const files = fs.readdirSync(srcDir);

  files.forEach((file) => {
    if (file.endsWith(".ts")) {
      const name = path.parse(file).name;
      entries[name] = path.join(srcDir, file);
    }
  });

  return entries;
};
module.exports = {
  entry: getEntries(path.resolve(__dirname, "src/js")),

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "src/js"),
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },

  module: {
    rules: [{ test: /\.(ts|js)x?$/, loader: "babel-loader", exclude: /node_modules/ }],
  },

  plugins: [new ForkTsCheckerWebpackPlugin()],
};
