var conn = require('../../sql/sqlconf')
	resfunc = require('../handlerTool/responseFunc')
	repeatType = require('../handlerTool/repeatType')

module.exports = (req, response, param) => {
	
	const editsql = `UPDATE dishtype SET typename = "${param.typename}" WHERE id = ${param.id}`
		addsql = `INSERT INTO dishtype(typename, userid) VALUES('${param.typename}', ${param.userid})`

	repeatType(param.typename)
	.then(val => 
		new Promise((resolve, reject) => {
			if(val.length > 0){
				reject('type repeat')
			}else{
				conn.query(param.id ? editsql : addsql, function(err, result){
				  	if(err){
				  		reject(err)
				  	}
				  	resolve(result)
				})
			}
		})
	)
	.then(data => {
		resfunc(response, 200, data)
	})
	.catch(err => {
		resfunc(response, err == 'type repeat' ? 60015 : 500, err)
	})

}