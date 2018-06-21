const path = require('path');
const ExtractText = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');

const extractSCSS = new ExtractText({filename: '[name].css'});
const extractHTML = new ExtractText({filename: '[name].html'});

const isProd = process.env.NODE_ENV === 'production';
const mode = isProd ? 'production' : 'development';

const plugins = [
    extractSCSS,
    extractHTML,
    autoprefixer,
];

if (isProd) {
    plugins.push(new UglifyJsPlugin({}));
}

module.exports = {
    mode: mode,
    entry: {
        index: './src/index.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    watchOptions: {
        aggregateTimeout: 200,
        poll: 500,
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist/'),
        inline: true,
        compress: true,
        port: 3005,
        publicPath: '/',
    },
    devtool: !isProd && 'source-map',
    stats: 'verbose',
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: extractHTML.extract({
                    use: {
                        loader: 'html-loader',
                    },
                }),
            },
            {
                test: /\.scss$/,
                use: extractSCSS.extract({
                    use: [
                        {loader: 'css-loader'},
                        {
                            loader: 'sass-loader',
                            options: {
                                outputStyle: isProd ? 'compressed' : 'expanded',
                            },
                        },
                    ],
                    fallback: 'style-loader',
                }),
            },
            {
                test: /\.(svg|png|jpg|gif)(\?[\s\S]+)?$/,
                loader: 'file-loader?name=[name].[ext]&publicPath=/public/&outputPath=images/',
            },
            {
                test: /\.(woff|woff2|ttf|eot)(\?[\s\S]+)?$/,
                loader: 'file-loader?name=[name].[ext]&publicPath=/public/&outputPath=fonts/',
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'common',
                    chunks: 'all',
                },
            },
        },
    },
    plugins: plugins,
};
