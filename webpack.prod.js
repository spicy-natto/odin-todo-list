const { mergeWithRules } = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = mergeWithRules({
  module: {
    rules: {
      test: "match",
      use: "replace",
    },
  },
})(common, {
  mode: "production",
  devtool: "source-map",
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
});
