var conn = require('../../sql/sqlconf')

const testfunc = _ => Math.floor(Math.random()*100)

module.exports = (req, response, param) => {
	
	const addSql = `INSERT INTO user(username,password) VALUES(${testfunc()},${testfunc()})`

	new Promise((resolve, reject) => {
		conn.query(addSql, function(err, result){
		  	if(err){
		  		reject(err)
		  	}
		  	resolve(result)
		})
	})
	.then(val => 
		new Promise((resolve, reject) => {
			conn.query('SELECT * FROM user', function(err, result){
			  	if(err){
			  		reject(err)
			  	}
			  	resolve(result)
			})
		})
	)
	.then(result => {

		response.writeHead(200)
	    response.write(JSON.stringify(result))
		response.end()
	})

}