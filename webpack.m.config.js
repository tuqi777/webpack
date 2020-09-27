const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const minicssPlugin = require("mini-css-extract-plugin");
const glob = require('glob');
const htmlWebpackPlugin = require("html-webpack-plugin");
const { entry, htmlPlugins } = (() => {
  let entry = {},
    htmlPlugins = [];
  const entryfiles = glob.sync(path.resolve(__dirname, "./src/*/index.js"));
  entryfiles.map(item => {
    let matchs = item.match(/\/src(.*)\/index\.js$/); // 获取页面名称
    let pageName = matchs[1];
    entry[pageName] = item;
    htmlPlugins.push(
      new htmlWebpackPlugin({
        template: path.join(__dirname, `./src/${pageName}/index.html`),
        filename: `${pageName}.html`,
      })
    );
  });
  return {
    entry,
    htmlPlugins,
  };
})();

module.exports = {
  mode: "development",
  entry,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [minicssPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "assets/images/", // 解决打包后图片路径加载问题
            limit: 50 * 1024, // 小于50k得图片，转成base64
          },
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin(), ...htmlPlugins],
};
