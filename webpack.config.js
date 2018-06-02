var path = require( 'path' );
var webpack = require( "webpack" );

module.exports = {
	entry: [ './public/js/config.js', 'babel-polyfill', './public/js/main.js' ],
	output: {
		path: path.join( __dirname, '/public/js/' ),
		filename: 'app.js'
	},
	module: {
		loaders: [
			{
				test: path.join( __dirname, '/public/js/' ),
				loader: 'babel-loader',
				query: {
					presets: [ 'es2015', 'stage-2' ]
				}
			}
		]
	},
	plugins: [ new webpack.optimize.UglifyJsPlugin( { minimize: true } ) ]
	//devtool: 'source-map'
};