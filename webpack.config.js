const path = require('path');

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
    watch: true
}
