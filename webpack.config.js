const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode        : 'development',
    entry       : {
        main        : './front/src/App.jsx',
    },
    output      : {
        path        : path.join(__dirname, 'front/dist'),
        filename    : './[name].bundle.js',
        publicPath  : '/',
        //sourceMapFilename   : '[file].map',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    plugins: ['transform-class-properties', 'transform-object-rest-spread', 'transform-regenerator', 'syntax-dynamic-import'],
                    presets: [
                        [
                            'env',
                            {
                                targets: {
                                    browsers: ['last 2 versions'],
                                }
                            }
                        ],
                        'react'
                    ]
                }
            },
        ]
    },
    plugins: [],
};
