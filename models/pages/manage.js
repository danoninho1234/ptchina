'use strict';

module.exports = async (req, res, next) => {

	res.render('manage', {
		//csrf: req.csrfToken(),
	});

}
