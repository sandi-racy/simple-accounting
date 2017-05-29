const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './www/src/main.js',
    output: {
        path: path.resolve(__dirname, 'www/js'),
        filename: 'build.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: [
                path.resolve(__dirname, 'node_modules')
            ]
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.min.css'), to: path.resolve(__dirname, 'www/css/bootstrap.min.css') },
            { from: path.resolve(__dirname, 'node_modules/font-awesome'), to: path.resolve(__dirname, 'www/css/font-awesome') }
        ])
    ],
    watch: true
}
