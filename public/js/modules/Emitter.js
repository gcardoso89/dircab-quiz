let globalEmitter = (function () {

	class Emitter {
		constructor() {
			this._events = {};
			this._globalEvents = {};
			this._timestampid = null;
			this._sameTimestampCounter = 0;
		}

		unsubscribe( id ) {
			if ( !this._globalEvents.hasOwnProperty( id ) ) {
				console.warn( "::Emitter warning:: " + id + ' is not declared yet' );
				return false;
			}
			delete this._globalEvents[ id ];
			return true;
		}

		subscribe( eventName, callback, priority ) {
			let id = this._getEventId();
			priority = priority || Number.MAX_VALUE;
			let event = { id, callback, priority, eventName };

			if ( !this._events.hasOwnProperty( eventName ) ) {
				this._events[ eventName ] = [];
			}
			this._events[ eventName ].push( event );
			this._globalEvents[ id ] = event;

			this._redefinePriorities( eventName, priority );

			return id;
		}

		invoke( eventName, ...other ) {
			if ( !this._events.hasOwnProperty( eventName ) ) {
				throw( "::Emitter warning:: " + eventName + ' is not declared yet')
			}
			for ( let i = 0; i < this._events[ eventName ].length; i++ ) {
				let value = this._events[ eventName ][ i ];
				value.callback( value, ...other );
			}
		}

		_redefinePriorities( eventName, priority ) {
			if ( typeof priority !== "undefined" ) {
				if ( typeof priority === "number" && priority > 0 ) {
					let eventList = this._events[ eventName ];
					eventList.sort( ( a, b ) => a.priority - b.priority );
				} else {
					throw( "::Emitter error:: The priority value must be a number and greater than 0" );
				}
			}
		}

		_getEventId() {
			let currentTimestamp = Date.now().toString();
			let id;

			if ( currentTimestamp === this._timestampid ) {
				id = `${currentTimestamp}_${++this._sameTimestampCounter}`
			} else {
				this._sameTimestampCounter = 0;
				id = currentTimestamp;
			}
			this._timestampid = currentTimestamp;

			return id;
		}
	}

	return new Emitter();

})();

export default globalEmitter;