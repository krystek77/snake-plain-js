const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  entry: './index.js',
  context: path.resolve(__dirname, 'src'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader', options: {} },
          { loader: 'eslint-loader' },
        ],
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(woff2|woff|ttf|eot|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      // context: 'src',
      files: '**/*.s?(a|c)ss',
      fix: true,
      failOnError: false,
      failOnWarning: false,
      emitWarning: true,
      emitError: true,
      quiet: false,
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    watchContentBase: true,
    port: 3000,
  },
  mode: 'development',
};
