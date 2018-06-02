export default class SocialLinks {

	constructor() {
		this._shareUrl = null;
		this._baseUrl = `${location.protocol}//${location.host}/`;
		this._twitter = document.querySelectorAll( '.sharing-twitter' );
		this._facebook = document.querySelectorAll( '.sharing-facebook' );

		for ( let i = 0; i < this._twitter.length; i++ ) {
			let btn = this._twitter[ i ];
			this._setTwitterLink( btn );
		}

		for ( let i = 0; i < this._facebook.length; i++ ) {
			let btn = this._facebook[ i ];
			this._setFacebookLink( btn );
		}

	}

	_setTwitterLink( button ) {
		let baseUrl = 'https://twitter.com/intent/tweet';
		let shareUrl = encodeURIComponent( this._baseUrl + button.dataset.profile );
		baseUrl += '?url=' + shareUrl;
		baseUrl += "&text=" + encodeURIComponent( button.dataset.description );

		button.addEventListener( 'click', ( e ) => {
			e.preventDefault();
			let width = 575,
				height = 400,
				left = (window.innerWidth - width) / 2,
				top = (window.innerHeight - height) / 2,
				opts = 'status=1' +
					',width=' + width +
					',height=' + height +
					',top=' + top +
					',left=' + left;
			window.open( baseUrl, 'twitter', opts );
			return false;
		} );

	}

	_setFacebookLink( button ) {
		button.addEventListener( 'click', ( e ) => {
			e.preventDefault();
			FB.ui( {
				method: 'share',
				href: this._baseUrl + button.dataset.profile
			} );
		} );
	}

}

