const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: './src/client/index.html',
  filename: './index.html'
});

module.exports = {
  mode: "development",
  entry: "./src/client/index.tsx",
  output: {
    path: `${__dirname}/dist/client`,
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      }
    ]
  },
  plugins: [
    htmlWebpackPlugin
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  },
  devServer: {
    historyApiFallback: true,
    inline: true,
    open: true,
    host: 'localhost',
    port: 9000,
    proxy: {
      '/api/**': {
        target: 'http://localhost:4000',
        secure: false,
        logLevel: 'debug'
      }
    },
  }
};