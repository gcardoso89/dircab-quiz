const prefixes = [
	'-webkit-',
	'-ms-',
	'-o-',
	'-moz-',
];

export function getProperty(property, value){
	let str='';
	for ( let i = 0; i < prefixes.length; i++ ) {
		let prefix = prefixes[ i ];
		str += `${prefix}${property}:${value};`;
	}
	str += `${property}:${value}`;
	return str;
}