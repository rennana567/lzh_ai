const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// webpack 配置文件
module.exports = {
    entry: './src/main.jsx', // 申明入口，webpack整理依赖关系，并打包
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    mode: 'development',
    target: 'web',
    module: { // webpack 支持解析的模块文件
        rules: [
            {
                test: /\.css$/i, // css 文件在这里处理
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(js|jsx)$/, // 匹配 .js 和 .jsx 文件
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react' // 处理 JSX
                        ]
                    }
                }
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html'
        })
    ],
    devServer: {
        port: 8080,
        open: true,
        hot: true,
        static: {
            directory: path.resolve(__dirname, 'dist')
        }
    }
}