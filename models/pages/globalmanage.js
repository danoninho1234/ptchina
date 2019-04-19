'use strict';

const Posts = require(__dirname+'/../../db/posts.js')
	, Bans = require(__dirname+'/../../db/bans.js');

module.exports = async (req, res, next) => {

	let reports;
	let bans;
	try {
		reports = await Posts.getGlobalReports();
		bans = await Bans.getGlobalBans();
	} catch (err) {
		return next(err)
	}

	//render the page
	res.render('globalmanage', {
		csrf: req.csrfToken(),
		reports,
		bans,
	});

}