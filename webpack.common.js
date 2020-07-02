const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const {TsConfigPathsPlugin} = require("awesome-typescript-loader");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        plugins: [new TsConfigPathsPlugin()],
        alias: {
            "react-spring$": "react-spring/web.cjs",
            "react-spring/renderprops$": "react-spring/renderprops.cjs"
        }
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
    cache: true,
    optimization: {
        minimizer: [new TerserPlugin()]
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
