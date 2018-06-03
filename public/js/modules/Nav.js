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
		if ( !this._navElements[newSectionIndex] ) return;
		this._navElements[newSectionIndex].setAttribute( 'class', 'selected' );
	}
}

export default Quiz;