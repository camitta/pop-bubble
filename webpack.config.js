const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
// App directory
const appDirectory = fs.realpathSync(process.cwd());
// Gets absolute path of file within app directory
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
	mode: isDev ? 'development' : 'production',
	entry: [
		'@babel/polyfill', // enables async-await
		'./src/app.js'
	],
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: './public/bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: [ '@babel/preset-env' ]
				}
			}
		]
	},
	plugins: [ new CompressionPlugin() ],
	devServer: {
		// Serve index.html from public as the base
		contentBase: resolveAppPath('public'),
		// Enable compression
		compress: true,
		// Enable hot reloading
		hot: true,
		host,
		port: 8080,
		// Public path is root of content base
		publicPath: '/'
	},
	node: {
		fs: 'empty'
	}
};
