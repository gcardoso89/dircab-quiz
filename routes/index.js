var express = require('express');
var router = express.Router();
var config = require('../public/js/config');
var questions = require('../questions');
var finals = require('../finals');
var availableProfiles = questions.reduce(function (previous, question) {
	for (var i = 0; i < question.answers.length; i++) {
		var profile = question.answers[i].profileUrl;
		if (!previous[profile]) previous[profile] = profile;
	}
	return previous;
}, {});
function generateNewColor() {
	var color = config.colorList[Math.floor(Math.random() * config.colorList.length)];
	var colorName = config.colorMap[color];
	return colorName;
}

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {classColorName: 'color-' + generateNewColor(), layout: null, questions: questions, finals: finals });
});

router.get('/:winner', function (req, res, next) {
	let winner = req.params.winner;
	if (!availableProfiles[winner]) {
		res.redirect( '/' );
		return;
	}
	let winnerObj = Object.assign({}, finals[winner]);
	winnerObj.key = winner;
	res.render('index', {classColorName: 'color-' + generateNewColor(), layout: null, winner: winnerObj, finals: finals });
});

module.exports = router;
