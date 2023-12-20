const path = require('path');
const fs = require('fs');

const INPUT_FILES = path.join(__dirname, 'src');
const INPUT_CSS_FILES = path.join(__dirname, 'style');
const OUTPUT_FILES = path.join(__dirname, 'docs/js');

const filesConfiguration = [
{
	in: [
		INPUT_FILES+'/lib/dom-modifications.js',
		INPUT_FILES+'/days/orch.ts',
		INPUT_CSS_FILES+'/style.less'
	],
	out: "bundle.js",
},
{
	in: [
		INPUT_FILES+'/lib/dom-modifications.js',
		INPUT_FILES+'/lines/orch.ts',
		INPUT_CSS_FILES+'/style-lines.less'
	],
	out: "bundle-linies.js",
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
          test: /\.[tj]sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader'
            },
          ]
        },
				{
					test: /\.less$/,
					use: [
						"style-loader",
						"css-loader",
						path.resolve('./src/loaders/css-min.js'), // css minifier
						"less-loader",                            // less interpreter
					]
				}
			]
		},
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
	}
));
