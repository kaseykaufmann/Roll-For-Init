const webpack = require("webpack");
const merge = require("webpack-merge");

const helpers = require("./helpers");
const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig, {
  mode: "production",

  output: {
    filename: "js/[name].[hash].js",
    chunkFilename: "[id].[hash].chunk.js"
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      },
      output: {
        comments: false
      }
    })
  ]
});
