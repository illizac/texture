var conn = require('../../sql/sqlconf')
	resfunc = require('../handlerTool/responseFunc')

module.exports = (req, response, param) => {
	
	const editsql = `UPDATE dishes SET dishname = "${param.dishname}", price = ${param.price}, typeid = ${param.typeid} WHERE id = ${param.id}`
		addsql = `INSERT INTO dishes(dishname, price, typeid, userid) VALUES('${param.dishname}', ${param.price}, ${param.typeid}, ${param.userid})`

	new Promise((resolve, reject) => {
		conn.query(param.id ? editsql : addsql, function(err, result){
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