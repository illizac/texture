const index = require('./handler/index')
	register = require('./handler/register')
	login = require('./handler/login')
	saveEdit = require('./handler/saveEdit')


module.exports = {
	index,
	register,
	login,
	saveEdit
}