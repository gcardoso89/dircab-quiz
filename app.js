var express = require( 'express' ),
	path = require( 'path' ),
	favicon = require( 'serve-favicon' ),
	logger = require( 'morgan' ),
	cookieParser = require( 'cookie-parser' ),
	bodyParser = require( 'body-parser' ),
	exphbs = require( "express-handlebars" ),
	routes = require( './routes/index' ),
	app = express(),
	isDevEnv = app.get( 'env' ) === 'development';

if ( isDevEnv ) {
	require( './socialImageGenerator' );
}

// view engine setup
app.engine( "hbs", exphbs( {
	helpers: require( "./helpers.js" ).helpers, // same file that gets used on our client
	extname: '.hbs',
	partialsDir: [
		'views/partials/'
	]
} ) );
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'hbs' );

app.use( favicon( path.join( __dirname, 'public', 'favicon.ico' ) ) );
if ( isDevEnv ) {
	app.use( require( 'node-compass' )( { project: __dirname, css: 'public/css', sass: 'compass/' } ) );
}
app.use( express.static( path.join( __dirname, 'public' ) ) );
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( cookieParser() );

app.use( '/', routes );

// catch 404 and forward to error handler
app.use( function ( req, res, next ) {
	var err = new Error( 'Not Found' );
	err.status = 404;
	next( err );
} );

// error handlers

// development error handler
// will print stacktrace
if ( isDevEnv ) {
	app.use( function ( err, req, res, next ) {
		//res.redirect( "/" );
		res.status( err.status || 500 );
		res.render( 'error', {
			message: err.message,
			error: err
		} );
	} );
}

// production error handler
// no stacktraces leaked to user
app.use( function ( err, req, res, next ) {
	res.redirect( "/" );
	/*res.status( err.status || 500 );
	res.render( 'error', {
		message: err.message,
		error: {}
	} );*/
} );


module.exports = app;
