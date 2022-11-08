const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { pages, cssFiles } = require('./utils');

module.exports = {
  entry: [
    './src/index.ts',
    ...cssFiles
  ],
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      {
        test: [/\.svg$/],
        use: 'file-loader'
      }
    ],
  },
  devServer: {
    hot: true,
    static: [
      path.join(__dirname, '/dist'),
    ],
    compress: true,
    port: 9000,
    open: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  plugins: [
    ...pages,
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
};
