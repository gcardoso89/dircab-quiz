import { EVENTS } from "./constants";
import Quiz from "./modules/Quiz";
import Nav from "./modules/Nav";
import SocialLinks from "./modules/SocialLinks";
import globalEmmiter from "./modules/Emitter";
import { getProperty } from "./modules/helpers";

(function () {
	class MainApp {
		constructor() {
			this._isIPhone = navigator.userAgent.toLowerCase().indexOf( "iphone" ) !== -1;
			this._quiz = new Quiz(this._isIPhone);
			this._nav = new Nav(this._isIPhone);
			this._social = new SocialLinks(this._isIPhone);
			this._entranceButton = document.getElementById( 'button-entrance' );
			this._container = document.querySelector( 'main' );
			this._body = document.getElementsByTagName( 'body' )[ 0 ];
			this._questionCount = this._quiz.getNumberOfQuestions();
			this._activeSection = null;
			globalEmmiter.subscribe( EVENTS.GO_TO_SECTION, this._goToSection.bind( this ) );
			if ( this._entranceButton ) {
				this._entranceButton.addEventListener( 'click', this._onEntranceButtonClick.bind( this ) );
			}

			if ( this._isIPhone ) {
				this._elementsToFix = document.querySelectorAll( 'main section, #main' );
				window.onresize = this._windowOnResize.bind( this );
				window.onload = this._windowOnResize.bind( this );
				window.onreadystatechange = this._windowOnResize.bind( this );
				window.onready = this._windowOnResize.bind( this );
				this._windowOnResize();
			}

		};

		_windowOnResize() {
			this._innerHeight = window.innerHeight;
			for ( let i = 0; i < this._elementsToFix.length; i++ ) {
				let element = this._elementsToFix[ i ];
				element.setAttribute( 'style', `height: ${this._innerHeight}px` );
			}
			if ( this._activeSection !== null ) {
				this._container.setAttribute( 'style', getProperty( 'transform', `translate3d(0,-${((this._activeSection + 1) * this._innerHeight)}px,0)` ) );
			}
		}

		_onEntranceButtonClick( evt ) {
			evt.preventDefault();
			globalEmmiter.invoke( EVENTS.GO_TO_SECTION, 0 );
			this._nav.show();
		}

		_addFinalClass() {
			const currentClass = this._body.getAttribute( 'class' );
			this._body.setAttribute( 'class', currentClass.replace( ' final', '' ) );
			this._body.setAttribute( 'class', currentClass + ' final' );
			if ( this._isIPhone ) setTimeout( () => this._windowOnResize(), 1000 );
		}

		_removeFinalClass() {
			const currentClass = this._body.getAttribute( 'class' );
			this._body.setAttribute( 'class', currentClass.replace( ' final', '' ) );
		}

		_goToSection( evt, sectionIndex ) {
			let style;
			this._activeSection = sectionIndex;
			if ( this._isIPhone ) {
				style = `translate3d(0,-${((sectionIndex + 1) * this._innerHeight)}px,0)`;
			} else {
				style = `translate3d(0,-${((sectionIndex + 1) * 100)}vh,0)`;
			}
			this._container.setAttribute( 'style', getProperty( 'transform', style ) );
			if ( sectionIndex === this._questionCount ) {
				this._nav.hide();
				this._addFinalClass();
			}
		}
	}

	new MainApp();
})();
