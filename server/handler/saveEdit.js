var conn = require('../../sql/sqlconf')

module.exports = (req, response, param) => {

	new Promise((resolve, reject) => {
		if(param.nickname && param.tablenum && param.id){
			conn.query(`UPDATE user SET nickname = "${param.nickname}",tablenum = ${param.tablenum} WHERE id = ${param.id}`, function(err, result){
				if(err) reject(err)
				resolve(result)
			})
		}else{
			reject('param wrong')
		}
	})
	.then(_ => new Promise((resolve, reject) => {
		conn.query(`SELECT * FROM user WHERE id = ${param.id}`, function(err, result){
			if(err) reject(err)
			resolve(result)
		})
	}))
	.then(data => {
		resfunc(response, 200, data)
	})
	.catch(err => {
		resfunc(response, 500, err)
	})

}