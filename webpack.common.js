const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const {TsConfigPathsPlugin} = require("awesome-typescript-loader");

module.exports = {
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        plugins: [
            new TsConfigPathsPlugin()
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts[x]?$/,
                loader: "babel-loader",
                exclude: /node_modules/
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        },
        minimizer: []
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.template.ejs",
            inject: "body"
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            exclude: ["index.html"]
        })
    ]
};
