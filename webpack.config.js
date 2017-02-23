const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  // return{
    entry: {
      'scripts/index':[path.resolve(__dirname, 'src/scripts/index.js')],
      'scripts/router':[path.resolve(__dirname, 'src/scripts/router.js')],
      'scripts/constants':[path.resolve(__dirname, 'src/scripts/constants.js')]
    },
    //入口文件输出配置
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].js',
      chunkFilename: "nav/[name].js"
    },
    module: {
      //加载器配置
      loaders: [
        {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
        {test: /\.css$/,loaders: ['style-loader','css-loader?importLoaders=1','postcss-loader']},
        {test: /.scss$/, loaders: ['style-loader','css-loader?importLoaders=1','sass-loader']},
        { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
        // {test: /\.css$/,loaders: ['style-loader','css-loader?importLoaders=1&modules&localIdentName=[local]___[hash:base64:5]','postcss-loader']},
      ]
    },
    plugins: [
      new webpack.DefinePlugin({ "global.GENTLY": false }),
      new webpack.DefinePlugin({'process.env': {'NODE_ENV': '"production"'}})
    ],
    devServer: {
      contentBase: "src/",//本地服务器所加载的页面所在的目录
      historyApiFallback: true,//不跳转
      // publicPath:'src',
      hot:true,
      open:true,
      inline: true//实时刷新
    } 
  // }
};
