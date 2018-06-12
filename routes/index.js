let express = require('express');
let router = express.Router();
let questions = require('../questions');
let finals = require('../finals');
let availableProfiles = ['bambi', 'charles-ingalls', 'mac-gyver', 'maitre-yoda'];
let shuffle = require('shuffle-array');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {layout: null, questions: shuffle(questions), finals: finals });
});

router.get('/:winner', function (req, res, next) {
	let winner = req.params.winner;
	if (!availableProfiles.indexOf(winner) === -1) {
		res.redirect( '/' );
		return;
	}
	let winnerObj = Object.assign({}, finals[winner]);
	winnerObj.key = winner;
	res.render('index', {layout: null, winner: winnerObj, finals: finals });
});

module.exports = router;
