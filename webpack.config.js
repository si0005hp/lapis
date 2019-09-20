const HtmlWebPackPlugin = require('html-webpack-plugin')
const dotenv = require('dotenv')
const webpack = require('webpack')

// Load .env values
const env = dotenv.config().parsed
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next])
  return prev
}, {})

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: './src/client/index.html',
  filename: './index.html'
})

module.exports = {
  mode: 'development',
  entry: './src/client/index.tsx',
  output: {
    path: `${__dirname}/dist/client`,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  plugins: [htmlWebpackPlugin, new webpack.DefinePlugin(envKeys)],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
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
    }
  }
}
