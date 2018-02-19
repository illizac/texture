var conn = require('../../sql/sqlconf')
	resfunc = require('../handlerTool/responseFunc')

module.exports = (req, response, param) => {

	new Promise((resolve, reject) => {
		const sql = `select * from dishorder where userid = ${param.id} and state=1`

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