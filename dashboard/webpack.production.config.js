const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  // npm install mini-css-extract-plugin --save-dev
const { CleanWebpackPlugin } = require('clean-webpack-plugin');  // npm install clean-webpack-plugin --save-dev
const HtmlWebpackPlugin = require('html-webpack-plugin');  // npm install html-webpack-plugin --save-dev
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
	entry: './src/dashboard.js',
	output: {
		filename: '[name].[contenthash].js',  // take the name of entry
		path: path.resolve(__dirname, './dist'),
		publicPath: 'http://localhost:9000/'
	},
	mode: 'production',
	optimization: {
		splitChunks: {
			chunks: 'all',  // extract common dependencies
			minSize: 3000  // extract if the file size > the number
		}
	},
	module: {
		rules: [
			{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',  // npm install @babel/core babel-loader @babel/preset-env @babel/plugin-proposal-class-properties --save-dev
                    options: {
                        presets: [ '@babel/env' ],
                        plugins: [ '@babel/plugin-proposal-class-properties' ]
                    }
                }
            },
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'  // extract css into a seperate bundle file, take the name of entry
		}),
		new CleanWebpackPlugin({  // clean dist folder before generate bundles
			cleanOnceBeforeBuildPatterns: [
				'**/*',  // remove all the files and sub folders from dist folder
				path.join(process.cwd(), 'build/**/*')  // remove all the files and sub folders from build folder
			]
		}),
		new HtmlWebpackPlugin({
			filename: 'dashboard.html',
			title: 'Dashboard'
		}),
		new ModuleFederationPlugin({
            name: 'App',
			remotes: {
				HelloWorldApp: 'HelloWorldApp@http://localhost:9001/remoteEntry.js',
				KiwiApp: 'KiwiApp@http://localhost:9002/remoteEntry.js'
			}
        })
	]
}
