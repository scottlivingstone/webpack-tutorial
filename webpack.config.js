const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');

let config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'output.js'
    }, 
    module: {
        rules: [
            {
                test: /\.js$/, // files ending with .js
                exclude: /node_modules/, // exclude the node_modules directory
                loader: "babel-loader" // use this (babel-core) loader
            },
            {
                test: /\.scss$/, // files ending with .scss
                use: ExtractTextWebpackPlugin.extract({ // call plugin with extract method
                    use: ['css-loader', 'sass-loader'], // use these loaders
                    fallback: 'style-loader' // fallback for any css not loaded
                }) // end extract
            },
            {
                test: /\.jsx$/, // files ending with .jsx
                exclude: /node_modules/, // exclude the node_modules directory
                loader: "babel-loader" // use this (babel-core) loader
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: ['file-loader?context=src/assets/images/&name=images/[path][name].[ext]', {
                    loader: 'image-webpack-loader',
                    query: {
                        mozjpeg: {
                            progressive: true,
                        },
                        gifsicle: {
                            interlaced: false,
                        },
                        optipng: {
                            optimizationLevel: 4,
                        },
                        pngquant: {
                            quality: '75-90',
                            speed: 3,
                        },
                    },
                }],
                exclude: /node_modules/,
                include: __dirname,
            },
        ] // end rules
    },
    plugins: [
        new ExtractTextWebpackPlugin('styles.css')
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './public'), // A directory of url to server the content from
        historyApiFallback: true, // fallback to /index.html for single page applications
        inline: true, // inline mode (set to false to disable including client scripts)
        open: true // open defulat browser when opening
    },
    devtool: 'eval-source-map' // enable dev tool for better debugging
}

module.exports = config;

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
      new webpack.optimize.UglifyJsPlugin(), // call the uglify plugin
      new OptimizeCSSAssets() // call the CSS optimizer for minification
    );
  }
  