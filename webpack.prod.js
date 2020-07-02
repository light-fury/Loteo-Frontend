const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const DotenvPlugin = require("dotenv-webpack");

module.exports = merge(common, {
    devtool: "hidden-source-map",
    output: {
        filename: "[name].[contenthash].js",
        chunkFilename: "[name].[contenthash].js"
    },
    module: {
        rules: [
            {
                test: /\.[s]?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                // extract all css into separate file - even async loaded bits
                styles: {
                    name: "styles",
                    test: /\.s?css$/,
                    chunks: "all",
                    minChunks: 1,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        },
        minimizer: [
            new TerserPlugin({
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new DotenvPlugin({
            path: "./.env.production",
            systemvars: true
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[name].[contenthash].css"
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: "public",
                to: ".",
                ignore: ".gitkeep"
            }
        ])
    ]
});
