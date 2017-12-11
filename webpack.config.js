const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
console.log(process.env.NODE_ENV)
const extractSass = new ExtractTextPlugin({
    filename: "app.[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    library: 'TwoFeet',
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './public'
  },
  module: {
        rules: [{
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        }]
    },
    plugins: [
        extractSass
    ]
};