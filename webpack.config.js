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
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: [
                path.resolve(__dirname, 'node_modules')
            ]
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader'
        }]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, 'node_modules/font-awesome'), to: path.resolve(__dirname, 'www/css/font-awesome') }
        ])
    ],
    watch: true
}
