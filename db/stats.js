
'use strict';

const Mongo = require(__dirname+'/db.js')
	, db = Mongo.client.db('jschan').collection('poststats');

module.exports = {

	updateOne: (board, ip, thread) => {
		return db.updateOne({
			'board': board,
			'hour': new Date().getHours()
		}, {
			'$inc': {
				'pph': 1,
				'tph': thread ? 1 : 0
			},
			'$addToSet': {
				'ips': ip
			}
		}, {
			'upsert': true
		});
	},

	getHourPosts: (board) => {
		return db.findOne({
			'board': board,
			'hour': new Date().getHours()
		}, {
			'projection': {
				'_id': 0,
				'pph': 1,
				'tph': 1
			}
		})
	},

	updateBoards: () => {
//todo: figure out how to get single result set and $group $facets so I can fix this and improve resetStats
		return db.aggregate([{
		    '$unwind': {
		        'path': '$ips',
		        'preserveNullAndEmptyArrays': true
		    }
		}, {
		    '$group': {
		        '_id': '$board',
		        'pph': {
		            '$sum': '$pph'
		        },
		        'ips': {
		            '$addToSet': '$ips'
		        }
		    }
		}, {
		    '$project': {
		        'ips': {
		            '$size': '$ips'
		        },
		        'pph': 1
		    }
		}, {
		    '$merge': {
		        'into': 'boards'
		    }
		}]).toArray();
	},

	//reset stats, used at start of each hour
	resetStats: () => {
		return Promise.all([
			db.updateMany({
				'hour': new Date().getHours()
			}, {
				'$set': {
					'ips': [],
				}
			}),
			db.updateMany({}, {
				'$set': {
					'pph': 0,
					'tph': 0
				}
			}),
		]);
	},

	deleteBoard: (board) => {
		return db.deleteMany({
			'board': board
		});
	},

	deleteAll: () => {
		return db.deleteMany({});
	},

}
