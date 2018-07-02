var webpack = require("webpack"),
  path = require('path');

module.exports = {
  entry: {
    "sppagecontextinfo": "./src/index",   
  },
  output: {
    path: __dirname,
    filename: "./dist/[name].js",
    library: "sppagecontextinfo",
    libraryTarget: "umd",
    umdNamedDefine: false
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts/, loader: 'ts-loader', exclude: /node_modules/,
      }
    ]
  },
  plugins: [   
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true
    }),    
  ]
}
