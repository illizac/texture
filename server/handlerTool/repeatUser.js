var conn = require('../../sql/sqlconf')

module.exports = user => new Promise((resolve, reject) => {
	conn.query(`SELECT * FROM user WHERE username = '${user}'`, function(err, result){
		if(err) reject(err)

		resolve(result)
	})
})