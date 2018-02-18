var conn = require('../../sql/sqlconf')

module.exports = (dishtype, id) => new Promise((resolve, reject) => {
	conn.query(`SELECT * FROM dishtype WHERE typename = '${dishtype}' AND userid = ${id}`, function(err, result){
		if(err) reject(err)

		resolve(result)
	})
})