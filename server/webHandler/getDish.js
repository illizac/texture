var conn = require('../../sql/sqlconf')
	resfunc = require('../handlerTool/responseFunc')
	
module.exports = (req, response, param) => {
	new Promise((resolve, reject) => {
		conn.query(`SELECT nickname,tablenum FROM user WHERE id=${param.id}`, function(err, result){
			if(err) reject(err)
			resolve(result)
		})
	})
	.then(data => new Promise((resolve, reject) => {
		conn.query(`select * from dishes where userid=${param.id}`, (err, result) => {
			if(err) reject(err)
			let o = Object.assign({}, data[0], {
				dishes: result
			})
			resolve(o)
		})
	}))
	.then(data => new Promise((resolve, reject) => {
		conn.query(`select * from dishtype where userid=${param.id}`, (err, result) => {
			if(err) reject(err)
			let arr = result.map(val => {
				val.title = val.typename
				delete val.typename
				return val
			})
			data.type = arr
			resolve(data)
		})
	}))
	.then(data => {
		resfunc(response, 200, data)
	})
	.catch(err => {
		resfunc(response, err == 'user none' ? 60013 : err == 'pass wrong' ? 60014 : 500, err)
	})

}