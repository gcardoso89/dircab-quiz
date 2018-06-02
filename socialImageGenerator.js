var fs = require( 'fs' );
var path = require( 'path' );
var config = require( './public/js/config' );
var btoa = require( 'btoa' );

var ImageGenerator = {

	_dimensionsGuide: {

		'facebook': {
			width: 1200,
			height: 630
		},

		'twitter': {
			width: 1024,
			height: 512
		},

		'gplus': {
			width: 800,
			height: 1200
		},

		'tumblr': {
			width: 1024,
			height: 512
		}

	},

	_environment: null,

	_webshot: require( 'webshot' ),

	generateImage: function ( id, type, cb ) {

		var that = this;
		var imageUrl = path.join( __dirname, 'public/images/social/' + type + '/' + id + '.jpg' );
		var url = '';

		url = 'http://localhost:3000/';
		url += id;

		var options = {
			quality: 100,
			renderDelay: 2500
		};
		options[ 'screenSize' ] = this._dimensionsGuide[ type ];
		options[ 'shotSize' ] = this._dimensionsGuide[ type ];

		that._webshot( url, imageUrl, options, function ( err ) {
			cb( imageUrl, err );
		} );

	}

};

if ( process.GENERATE_SOCIAL_IMAGES ){
	console.log( "Generating SOCIAL images" );
	for ( var word in config.wordDetailMap ) {
		if ( config.wordDetailMap.hasOwnProperty( word ) ) {
			ImageGenerator.generateImage( btoa( word ), 'facebook', (function ( word ) {
				return function() { console.log( "Image Complete for word " + word ) };
			})( word ) );
		}
	}
}
