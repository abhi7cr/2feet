const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('../../webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));
app.use(express.static('public'))
app.use('/fonts', express.static('src/assets/font-awesome-4.7.0/fonts'))
app.get('/', function (req, res) {
    var root = __dirname.split('/src/')[0] +  '/public'
    res.sendFile('index.html', {root: root})
})

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Two feet listening on port 3000!\n');
});