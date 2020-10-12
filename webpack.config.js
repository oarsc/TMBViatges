module.exports = {
  entry: [
    'babel-polyfill',
    './docs/js_ext/orch.js',
    './docs/css/style.css'
  ],
  output: {
    path: __dirname,
    publicPath: '/docs/',
    filename: 'docs/js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          //loader: "script-loader"
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: false,
              importLoaders: 1,
              //localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              //minimize: true
            }
          }
        ]
      }
    ]
  }
};