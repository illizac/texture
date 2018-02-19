var conn = require('../../sql/sqlconf')
	resfunc = require('../handlerTool/responseFunc')

module.exports = (req, response, param) => {

	new Promise((resolve, reject) => {
		const sql = `update dishorder set state = 1 where state = 2 and tablenum = ${param.tablenum} and userid = ${param.id}`

		conn.query(sql, function(err, result){
		  	if(err){
		  		reject(err)
		  	}
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