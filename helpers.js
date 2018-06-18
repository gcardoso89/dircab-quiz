let register = function(Handlebars) {
	let helpers = {
		// put all of your helpers inside this object
		navNumber: function(number){
			number = parseInt(number, 10) + 1;
			return number < 10 ? '0' + number : number;
		},
		// put all of your helpers inside this object
		equal: function(arg1, arg2, options){
			return arg1 === arg2 ? options.fn(this) : undefined;
		},
		isNotCurrentProfile(arg1, arg2) {
			console.log(arg1, arg2);
			return arg1 !== arg2
		},
		toLowerCase(text) {
			return text.toLowerCase();
		}
	};

	if (Handlebars && typeof Handlebars.registerHelper === "function") {
		// register helpers
		for (let prop in helpers) {
			Handlebars.registerHelper(prop, helpers[prop]);
		}
	} else {
		// just return helpers object if we can't register helpers here
		return helpers;
	}

};

module.exports.register = register;
module.exports.helpers = register(null);