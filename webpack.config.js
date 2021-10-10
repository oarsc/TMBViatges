const path = require('path');
const fs = require('fs');

const INPUT_FILES = path.join(__dirname, 'docs/js_ext');
const OUTPUT_FILES = path.join(__dirname, 'docs/js');

const filesConfiguration = [
/*
{
	in: [
		'core-js',
		INPUT_JS_FILES+'/dom-modifications.js',
	],
	out: "polyfill.min.js",
},
*/

/*
...fs.readdirSync(INPUT_JS_FILES, { withFileTypes:true })
	.filter(element => element.isFile())
	.map(file => file.name)
	.filter(filename => filename.indexOf('.o.js') > 0)
	.map(filename => ({
		in: `${INPUT_JS_FILES}/${filename}`,
		out: filename.replace(/\.o\.jsx?$/, '.min.js'),
	})),
*/

{
	in: [
		'core-js',
		INPUT_FILES+'/dom-modifications.js',
		INPUT_FILES+'/orch.js',
		...['docs/css'].flatMap(dir=>
			fs.readdirSync(dir).map(filename => `./${dir}/${filename}`)
		)
	],
	out: "bundle.js",
},
];

module.exports = filesConfiguration.map(entry => (
	{
		entry: entry.in,
		output: {
			path: OUTPUT_FILES,
			publicPath: '/',
			filename: entry.out
		},
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								['@babel/preset-env', {
									//"corejs": 3,
									//useBuiltIns: "usage",
								}]
		    				]
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
	}
));
