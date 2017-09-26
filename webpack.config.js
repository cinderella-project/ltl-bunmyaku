const webpack = require("webpack")

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname+"/dist",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: 'dist'
    },
    plugins: [
        new webpack.ProvidePlugin({
            riot: "riot"
        }),
        // new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        loaders: [
            { test: /\.tag$/, exclude: /node_modules/, loader: 'riot-tag-loader', query: {
                type: "none",
                template: "pug",
            }},
        ]
    }
}