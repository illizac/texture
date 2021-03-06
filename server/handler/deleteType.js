var conn = require('../../sql/sqlconf')
	resfunc = require('../handlerTool/responseFunc')

module.exports = (req, response, param) => {
	
	const sql = `DELETE FROM dishType WHERE id = ${param.id}`

	new Promise((resolve, reject) => {
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