import path from 'path';
import glob from 'glob';
import writeFilePlugin from 'write-file-webpack-plugin';
import webpack from 'webpack';
var pathRes = path.resolve(__dirname,'public/js');
console.log(pathRes);
var ctrlEntries = glob.sync(`${pathRes}/mvc/controllers/*.js`);
var factEntries = glob.sync(`${pathRes}/mvc/factories/*.js`);
var entries = ctrlEntries.concat(factEntries);
var buildEntries = glob.sync(`${pathRes}/*.js`);
console.log(entries);
export default {

  devtool: 'inline-source-map',

  entry:{
  mvc: entries

  }
  ,
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'public/js/mvc'),
    publicPath: '/js/mvc',
    filename: '[name].js'
  },
  plugins: [
    new writeFilePlugin()

  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /\.css$/, loaders: ['style','css']}
    ]
  },
  resolve: {
    modules: [
      path.join(__dirname, "public/js"),
      "node_modules"
    ]
  }
}
