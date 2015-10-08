var webpack = require('webpack');
module.exports = {
    entry: [
        'webpack/hot/only-dev-server',
        "./public/js/main.js"
    ],
    output: {
        path: __dirname + '/public/build/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
          { test: /.jsx?$/, loaders: ['react-hot', 'babel-loader'], exclude: /node_modules/ }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin()
      , new webpack.HotModuleReplacementPlugin()
    ]

};
