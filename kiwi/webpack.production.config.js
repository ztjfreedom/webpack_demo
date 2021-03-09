const path = require('path');
// const TerserPlugin = require('terser-webpack-plugin');  // npm install terser-webpack-plugin --save-dev (if use webpack version >= 5, do not need to install), include by default in production mode
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  // npm install mini-css-extract-plugin --save-dev
const { CleanWebpackPlugin } = require('clean-webpack-plugin');  // npm install clean-webpack-plugin --save-dev
const HtmlWebpackPlugin = require('html-webpack-plugin');  // npm install html-webpack-plugin --save-dev
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
	// entry: {
	// 	'hello-world': './src/hello-world.js',
	// 	'kiwi': './src/kiwi.js'
	// },
	entry: './src/kiwi.js',
	output: {
		filename: '[name].[contenthash].js',  // take the name of entry
		path: path.resolve(__dirname, './dist'),
		publicPath: 'http://localhost:9002/'
		// publicPath: '/static/'
		// publicPath: 'http://cdn.com/'
	},
	mode: 'production',
	optimization: {
		splitChunks: {
			chunks: 'all',  // extract common dependencies
			minSize: 10000  // extract if the file size > the number
		}
	},
	module: {
		rules: [
			// {
			// 	test: /\.(ttf)$/,
			// 	type: 'asset/resource'
			// },
			{
				test: /\.(png|jpg)$/,
				parser: {
					dataUrlCondition: {
						maxSize: 3 * 1024  // 3kb
					}
				},
				type: 'asset'                // automatically choose from inline (<8kb) / resource (>8kb), 8kb is default, now it is set to 3kb based on the parser
				// type: 'asset/inline'      // for small files
				// type: 'asset/resource'    // for large files
			},
			{
				test: /\.(txt)$/,
				type: 'asset/source'         // read plain text files and treat the content as JS String
			},
			// {
			// 	test: /\.(css)$/,
			// 	use: [
			// 		MiniCssExtractPlugin.loader, 'css-loader'  // npm install css-loader style-loader --save-dev
			// 	]
			// },
			{
				test: /\.(scss)$/,
				use: [
					MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'  // npm install sass-loader sass --save-dev, webpack use loaders from right to left
				]
			},
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
				test: /\.hbs$/,
				use: [
					'handlebars-loader'  // template, npm install handlebars-loader handlebars --save-dev
				]
			}
		]
	},
	plugins: [
		// new TerserPlugin(),  // minimize the size of js bundle, include by default in production mode
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'  // extract css into a seperate bundle file, take the name of entry
		}),
		new CleanWebpackPlugin({  // clean dist folder before generate bundles
			cleanOnceBeforeBuildPatterns: [
				'**/*',  // remove all the files and sub folders from dist folder
				path.join(process.cwd(), 'build/**/*')  // remove all the files and sub folders from build folder
			]
		}),
		// new HtmlWebpackPlugin({
		// 	filename: 'hello-world.html',
		// 	chunks: [ 'hello-world' ],  // specified by entry
		// 	template: 'src/page-template.hbs',
		// 	title: 'Hello World',
		// 	description: 'Hello World',
		// 	minify: false
		// }),
		new HtmlWebpackPlugin({
			filename: 'kiwi.html',
			// chunks: [ 'kiwi' ],  // specified by entry
			template: 'src/page-template.hbs',
			title: 'Kiwi',
			description: 'Kiwi',
			minify: false
		}),
		new ModuleFederationPlugin({
            name: 'KiwiApp',
            // remotes: {
            //     HelloWorldApp: 'HelloWorldApp@http://localhost:9001/remoteEntry.js'
            // }
			filename: 'remoteEntry.js',
			exposes: {
				'./KiwiPage': './src/components/kiwi-page/kiwi-page.js'
			}
        })
	]
}
