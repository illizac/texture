var conn = require('../../sql/sqlconf')
	resfunc = require('../handlerTool/responseFunc')
	
module.exports = (req, response, param) => {
	new Promise((resolve, reject) => {
		let dishlist = JSON.parse(param.dish)

		let str = dishlist.map(v => `(${v.dishid}, '${v.dishname}', ${v.userid}, ${v.count}, ${v.tablenum}, 2)`).join(',')

		conn.query(`insert into dishorder(dishid, dishname, userid, count, tablenum, state) values ${str}`, function(err, result){
			if(err) reject(err)
			resolve(result)
		})
	})
	.then(data => {
		resfunc(response, 200, data)
	})
	.catch(err => {
		resfunc(response, 500, err)
	})

}