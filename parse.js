let xlsxj = require("xlsx-to-json");
let fs = require('fs');
let urlify = require('urlify').create({
	spaces: "-",
	nonPrintable: "-",
	trim: true,
	toLower: true
});
let btoa = require('btoa');
xlsxj({
	input: "dircab.xlsx",
	output: "dircab.json"
}, function (err, result) {
	if (err) {
		console.error(err);
	} else {
		let questions = [];
		let i, entry;
		for (i = 0; i < result.length; i++) {
			entry = result[i];

			if (entry['Question'] !== '') {
				questions.push(
					{
						order: parseInt(entry['Question\norder'], 10),
						question: entry['Question']
					}
				)
			}
		}
		questions.sort(function (a, b) {
			return a.order - b.order;
		});

		let file = 'const QUESTIONS = ' + JSON.stringify(questions) + ';module.exports = QUESTIONS;';
		fs.writeFileSync('questions.js', file, {encoding: 'utf-8'});
	}
});