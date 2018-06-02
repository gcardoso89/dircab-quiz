var xlsxj = require("xlsx-to-json");
var fs = require('fs');
var urlify = require('urlify').create({
	spaces: "-",
	nonPrintable: "-",
	trim: true,
	toLower: true
});
var btoa = require('btoa');
xlsxj({
	input: "newyear2018.xlsx",
	output: "newyear2018.json"
}, function (err, result) {
	if (err) {
		console.error(err);
	} else {
		var questions = [];
		var i, j, question, entry, currentQuestion, profileUrl;
		for (i = 0; i < result.length; i++) {
			entry = result[i];

			if (entry['Answer'] === '') break;

			if (entry['Question'] !== '') {
				questions.push(
					{
						order: parseInt(entry['Question\norder'], 10),
						question: entry['Question'],
						answers: [],

					}
				)
			}

			currentQuestion = questions[questions.length - 1];
			profileUrl = urlify(entry['Profile']);
			currentQuestion.answers.push(
				{
					answer: entry['Answer'],
					order: parseInt(entry['Answer order'], 10),
					profile: entry['Profile'],
					profileCode: btoa(profileUrl),
					profileUrl: profileUrl
				}
			)
		}


		//Sort answers
		for (i = 0; i < questions.length; i++) {
			question = questions[i];
			question.answers.sort(function (a, b) {
				return a.order - b.order;
			});
		}

		questions.sort(function (a, b) {
			return a.order - b.order;
		});

		var file = 'const QUESTIONS = ' + JSON.stringify(questions) + ';module.exports = QUESTIONS;';
		fs.writeFileSync('questions.js', file, {encoding: 'utf-8'});
	}
});