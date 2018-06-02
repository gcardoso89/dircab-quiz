import { EVENTS } from '../constants';
import globalEmmiter from './Emitter';
import { getProperty } from "./helpers";

class Quiz {
	constructor() {
		this._container = document.getElementById( 'nav' );
		this._navElements = document.querySelectorAll( '#nav ul li' );
		globalEmmiter.subscribe( EVENTS.GO_TO_SECTION, this._onSectionChange.bind( this ) );
	}

	show() {
		this._container.setAttribute( 'style', getProperty( 'transform', 'translate3d(0,0,0)' ) );
	}

	hide() {
		this._container.setAttribute( 'style', '' );
	}

	_onSectionChange( evt, newSectionIndex ) {
		debugger;
		for ( let i = 0; i < this._navElements.length; i++ ) {
			let navElement = this._navElements[ i ];
			let className = navElement.getAttribute( 'class' );
			if ( className.indexOf( ' selected' ) !== -1 ) {
				navElement.setAttribute( 'class', className.replace( ' selected', '' ) );
			}
			if ( i === newSectionIndex ) {
				navElement.setAttribute( 'class', className + ' selected' );
			}
		}
	}
}

export default Quiz;