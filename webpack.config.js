const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: 'bundle.js',
  },
  mode: 'development',
  devServer: {
    host: 'localhost', 
    port: 8080, 
    static: {
      directory: path.resolve(__dirname, 'dist'), 
      publicPath: '/',
    }, 
    hot: true, 

    proxy: {
      '/api/**': {
        target: 'http://localhost:3000/', 
        secure: false,
      }
    }
  },
  
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env', 
                '@babel/preset-react' 
              ]
            }, 
        
      },
      // CSS rules 
      {
        test: /\.(css|scss)$/, 
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader', 
        ]
      }, 
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg|ico)$/,
        exclude: /node_modules/,
        use: [
          {
            // loads files as base64 encoded data url if image file is less than set limit
            loader: 'url-loader',
            options: {
              // if file is greater than the limit (bytes), file-loader is used as fallback
              limit: 8192,
            },
          },
        ],
      },  
    ]
  }, 
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
    }),
  ],
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx'],
  },
};