const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  entry: {
    'scripts/index':[path.resolve(__dirname, 'src/scripts/index.js')]
  },
  //入口文件输出配置
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
    chunkFilename: "nav/[name].js"
  },
  module: {
    //加载器配置
    loaders: [
      {
        // loader: "babel-loader",exclude: /node_modules/,query: {presets: ["es2015", "react"]},
        test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"
      },
      {test: /\.css$/,loaders: ['style','css']},
      {test: /.scss$/, loader: "style!sass"},
      //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false }),
    new webpack.DefinePlugin({'process.env': {'NODE_ENV': '"production"'}}),
  ],
  devServer: {
    contentBase: "src/",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    // publicPath:'public',
    hot:true,
    inline: true//实时刷新
  } 
};
