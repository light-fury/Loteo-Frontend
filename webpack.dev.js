const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const DotenvPlugin = require("dotenv-webpack");

module.exports = merge(common, {
    devtool: "cheap-module-eval-source-map",
    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        host: "0.0.0.0",
        port: 3000,
        progress: true,
        hot: true
    },
    output: {
        filename: "[name].js",
        chunkFilename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.[s]?css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            includePaths: [path.resolve(__dirname, "./src")]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new DotenvPlugin({
            path: "./.env.dev"
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
});
