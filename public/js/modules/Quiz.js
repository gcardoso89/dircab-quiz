import { EVENTS } from '../constants';
import globalEmmiter from './Emitter';

class Quiz {
	constructor( isIPhone ) {
		this._results = {};
		this._quiz = document.getElementById( 'quiz' );
		this._questionCount = document.querySelectorAll( 'form section' ).length;
		this._buttons = document.querySelectorAll( 'form section button' );
		this._resetButton = document.querySelector( 'input[type="reset"]' );
		this._restartButton = document.querySelectorAll( '.restart-button' );
		this._isIPhone = isIPhone;
		let radioList = document.querySelectorAll( 'input[type="radio"]' );
		for ( let i = 0; i < radioList.length; i++ ) {
			let radio = radioList[ i ];
			this._results[ radio.name ] = null;
			radio.addEventListener( 'change', this.onChangeAnswer.bind( this ) );
		}
		for ( let i = 0; i < this._restartButton.length; i++ ) {
			let restart = this._restartButton[ i ];
			restart.addEventListener( 'click', ( e ) => globalEmmiter.invoke( EVENTS.RESTART_QUIZ ) );
		}
		for ( let i = 0; i < this._buttons.length; i++ ) {
			let button = this._buttons[ i ];
			button.addEventListener( 'click', e => e.preventDefault() )
		}
		globalEmmiter.subscribe( EVENTS.RESTART_QUIZ, this._restartQuiz.bind( this ) );
	}

	getNumberOfQuestions() {
		return this._questionCount;
	}

	onChangeAnswer( evt ) {
		let element = evt.target;
		let profile = atob( element.dataset.profile );
		let question = element.name;
		if ( element.checked ) {
			this._results[ question ] = profile;
		}
		// The first index is the main one
		globalEmmiter.invoke( EVENTS.GO_TO_SECTION, parseInt( question, 10 ) + 1 );
		if ( parseInt( question, 10 ) === this._questionCount - 1 ) {
			let winner = this.checkFinalResult();
			this.showWinner( winner );
		}
	}

	_restartQuiz() {
		window.location = '/';
	}

	reset() {
		this._resetButton.click();
		for ( let question of Object.keys( this._results ) ) {
			this._results[ question ] = null;
		}
	}

	checkFinalResult() {
		let submitted = true;
		let ranking = {};
		let max = 0;
		let winners = [];
		for ( let question of Object.keys( this._results ) ) {
			if ( !this._results[ question ] ) {
				submitted = false;
				break;
			}
			if ( !ranking[ this._results[ question ] ] ) {
				ranking[ this._results[ question ] ] = 0;
			}
			ranking[ this._results[ question ] ]++;
			if ( ranking[ this._results[ question ] ] > max ) {
				winners.length = 0;
				max = ranking[ this._results[ question ] ];
				winners.push( this._results[ question ] );
			} else if ( ranking[ this._results[ question ] ] === max ) {
				winners.push( this._results[ question ] );
			}
		}

		return winners[ 0 ];
	}

	hideWinner() {
		let finalBlocks = document.querySelectorAll( '.winner' );
		for ( let i = 0; i < finalBlocks.length; i++ ) {
			let block = finalBlocks[ i ];
			block.setAttribute( 'style', '' );
			block.setAttribute( 'class', 'final-container' );
		}
	}

	showWinner( winner ) {
		let finalBlocks = document.querySelectorAll( '.final-container' );
		for ( let i = 0; i < finalBlocks.length; i++ ) {
			let block = finalBlocks[ i ];
			block.setAttribute( 'style', '' );
			block.setAttribute( 'class', 'final-container' );
		}
		let winnerBlock = document.getElementById( `final-${winner}` );
		if ( this._isIPhone ){
			winnerBlock.setAttribute( 'style', 'display:block;' );
		} else {
			winnerBlock.setAttribute( 'style', 'display:flex;' );
		}
		setTimeout( () => winnerBlock.setAttribute( 'class', 'final-container winner' ), 100 );
		setTimeout( () => winnerBlock.setAttribute( 'style', winnerBlock.getAttribute('style')+ ';height:auto;' ), 1000 );
		history.pushState({}, 'Winner', `/${winner}`);
	}
}

export default Quiz;