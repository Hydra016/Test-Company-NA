const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")

module.exports = (env, argv) => {
    var exp = {
        mode: "development",
        entry: './src/main.ts',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
            ],
        },
        devServer: {
            watchFiles: ["src/*.html", "src/res/*.*"],
            hot: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: "src/index.html"
            }),
            new CopyPlugin({
                patterns: [
                    { from: "src/res", to: "res/" },
                ],
            }),
        ],
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        entry: {
            main: path.resolve(__dirname, "src/main.ts")
        },
        output: {
            path: path.resolve(__dirname, 'Release'),
            filename: '[name].js',
        },
        performance: {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        }
    }

    return exp
}