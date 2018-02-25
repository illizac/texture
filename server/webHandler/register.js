var conn = require('../../sql/sqlconf')
	repeatCustom = require('../handlerTool/repeatCustom')
	resfunc = require('../handlerTool/responseFunc')

module.exports = (req, response, param) => {

	repeatCustom(param.username)
	.then(val => 
		new Promise((resolve, reject) => {
			if(val.length > 0){
				reject('username repeat')
			}else{
				conn.query(`INSERT INTO custom(username,password) VALUES("${param.username}","${param.password}")`, function(err, result){
					if(err) reject(err)

					resolve(result)
				})
			}
		})
	)
	.then(result => {
		resfunc(response, 200, 'register success')
	})
	.catch(err => {
		resfunc(response, err == 'username repeat' ? 60012 : 500, err)
	})

}