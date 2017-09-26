import path from 'path';


export default {

  devtool: 'inline-source-map',

  entry: [
    path.resolve(__dirname, 'public/javascripts/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'public/javascripts'),
    publicPath: '/javascripts/',
    filename: 'bundle.js'
  },
  plugins: [
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /\.css$/, loaders: ['style','css']}
    ]
  }
}
