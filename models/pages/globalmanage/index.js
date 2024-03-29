'use strict';

module.exports = {
	globalManageReports: require(__dirname+'/reports.js'),
	globalManageBans: require(__dirname+'/bans.js'),
	globalManageLogs: require(__dirname+'/logs.js'),
	globalManageBoards: require(__dirname+'/boards.js'),
	globalManageRecent: require(__dirname+'/recent.js'),
	globalManageNews: require(__dirname+'/news.js'),
	globalManageAccounts: require(__dirname+'/accounts.js'),
	globalManageSettings: require(__dirname+'/settings.js'),
	editNews: require(__dirname+'/editnews.js'),
}
