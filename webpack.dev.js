module.exports = merge(common, {
    mode: 'development',
    devtool: "eval-source-map",
    devServer: {
        watchFiles: ["./src/template.html"],
    },
  });