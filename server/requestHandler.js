const register = require('./handler/register')
	login = require('./handler/login')
	saveEdit = require('./handler/saveEdit')
	getType = require('./handler/getType')
	editType = require('./handler/editType')
	deleteType = require('./handler/deleteType')


module.exports = {
	register,
	login,
	saveEdit,
	getType,
	editType,
	deleteType
}