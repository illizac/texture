var conn = require('../../sql/sqlconf')
	resfunc = require('../handlerTool/responseFunc')
	repeatUser = require('../handlerTool/repeatUser')

module.exports = (req, response, param) => {

	repeatUser(param.username)
	.then(val => 
		new Promise((resolve, reject) => {
			if(val.length > 0){
				reject('username repeat')
			}else{
				conn.query(`INSERT INTO user(username,password,nickname,tablenum) VALUES("${param.username}","${param.password}","${param.nickname || '商家用户'}",${param.tablenum || 0})`, function(err, result){
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