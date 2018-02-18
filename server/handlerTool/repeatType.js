var conn = require('../../sql/sqlconf')

module.exports = dishtype => new Promise((resolve, reject) => {
	conn.query(`SELECT * FROM dishtype WHERE typename = '${dishtype}'`, function(err, result){
		if(err) reject(err)

		resolve(result)
	})
})