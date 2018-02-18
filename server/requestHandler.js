const register = require('./handler/register')
	login = require('./handler/login')
	saveEdit = require('./handler/saveEdit')
	getType = require('./handler/getType')
	editType = require('./handler/editType')
	deleteType = require('./handler/deleteType')
	getDishes = require('./handler/getDishes')
	editDish = require('./handler/editDish')
	deleteDish = require('./handler/deleteDish')


module.exports = {
	register,
	login,
	saveEdit,
	getType,
	editType,
	deleteType,
	getDishes,
	editDish,
	deleteDish
}