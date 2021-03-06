var conn = require('../../sql/sqlconf')
	resfunc = require('../handlerTool/responseFunc')
	repeatUser = require('../handlerTool/repeatUser')

	
module.exports = (req, response, param) => {

	repeatUser(param.username)
	.then(val => 
		new Promise((resolve, reject) => {
			if(val.length == 0){
				reject('user none')
			}else if(val[0].password != param.password){
				reject('pass wrong')
			}else{
				conn.query(`SELECT * FROM user WHERE username=${param.username} AND password=${param.password}`, function(err, result){
					if(err) reject(err)

					resolve(result)
				})
			}
		})
	)
	.then(data => {
		resfunc(response, 200, data)
	})
	.catch(err => {
		resfunc(response, err == 'user none' ? 60013 : err == 'pass wrong' ? 60014 : 500, err)
	})

}