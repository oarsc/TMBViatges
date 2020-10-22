const path = require('path');
const fs = require('fs');

const styleFiles = ['docs/css']
	.flatMap(dir=>
		fs.readdirSync(dir).map(filename => `./${dir}/${filename}`)
	);

module.exports = {
	entry: [
		'babel-polyfill',
		'./docs/js_ext/orch.js',
		...styleFiles
	],
	output: {
		path: __dirname,
		publicPath: '/docs/',
		filename: 'docs/js/bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.less$/,
				use: [
					"style-loader",
					"css-loader",
					path.resolve('./loader/css-min.js'), // css minifier
					"less-loader",                       // less interpreter
				]
			}
		]
	}
};