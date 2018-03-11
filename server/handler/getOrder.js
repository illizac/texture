var conn = require('../../sql/sqlconf')
	resfunc = require('../handlerTool/responseFunc')

const splitStr = str => str.split(',')

module.exports = (req, response, param) => {

	new Promise((resolve, reject) => {
		const sql = `select group_concat(id) as id,group_concat(dishid) as dishid,group_concat(dishname) as dishname, userid, state,tablenum,group_concat(count) as count from dishorder where userid = ${param.id} and state = 2 group by tablenum`

		conn.query(sql, function(err, result){
		  	if(err){
		  		reject(err)
		  	}
		  	resolve(result)
		})
	})
	.then(val => new Promise((resolve, reject) => {
		let arr = []
		for(let i in val){
			let obj = {
				tablenum: val[i].tablenum,
				userid: val[i].userid,
				state: val[i].state,
				orderlist: []
			}

			let stash = {}
			stash.id = splitStr(val[i].id)
			stash.dishid = splitStr(val[i].dishid)
			stash.count = splitStr(val[i].count)
			stash.dishname = splitStr(val[i].dishname)

			for(let j in stash.id){
				let o = {}

				for(let k in stash){
					o[k] = stash[k][j]
				}

				obj.orderlist.push(o)
			}

			arr.push(obj)
		}

		resolve(arr)
	}))
	.then(data => {
		resfunc(response, 200, data)
	})
	.catch(err => {
		resfunc(response, 500, err)
	})

}