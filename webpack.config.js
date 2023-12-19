const path = require('path');
const fs = require('fs');

const INPUT_FILES = path.join(__dirname, 'docs/js_ext');
const INPUT_CSS_FILES = path.join(__dirname, 'docs/css');
const OUTPUT_FILES = path.join(__dirname, 'docs/js');

const filesConfiguration = [
{
	in: [
		INPUT_FILES+'/dom-modifications.js',
		INPUT_FILES+'/orch.ts',
		INPUT_CSS_FILES+'/style.less'
		/*...['docs/css'].flatMap(dir =>
			fs.readdirSync(dir).map(filename => `./${dir}/${filename}`)
		)*/
	],
	out: "bundle.js",
},
{
	in: [
		INPUT_FILES+'/dom-modifications.js',
		INPUT_FILES+'/linies/orch.ts',
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
						path.resolve('./loader/css-min.js'), // css minifier
						"less-loader",                       // less interpreter
					]
				}
			]
		},
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
	}
));
