'use strict';

module.exports = {
	checkAuth: (req, res, next) => {
	    if (req.session.authenticated === true) return next()
	    res.redirect('/login')
	}
}
