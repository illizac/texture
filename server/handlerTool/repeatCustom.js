var conn = require('../../sql/sqlconf')
module.exports = custom => new Promise((resolve, reject) => {
	conn.query(`SELECT * FROM custom WHERE username = '${custom}'`, function(err, result){
		if(err) reject(err)

		resolve(result)
	})
})