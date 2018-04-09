const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: [
            'webpack/hot/dev-server',
            'webpack-hot-middleware/client?reload=true',
            path.join(__dirname, "webclient", "clientapp.jsx")
        ]
    },
    output: {
        path: "/",
        publicPath: "http://localhost:8080/dist/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loaders: ['babel?presets[]=react,presets[]=es2015,presets[]=stage-0']
            }, {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: ['file-loader']
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '/index.js', '/index.jsx']
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({template: path.resolve('./webclient/index.html')})
    ]
};
