import fetch from 'isomorphic-fetch'

const baseUrl = 'http://192.168.0.102:8098'

const handleParam = (url, param) => {
	let str = `${baseUrl}/${url}?`
	for(let i in param){
		str += `${i}=${param[i]}&`
	}

	return str
}


export const register = param => fetch(handleParam('register', param)).then(res => res.json())

export const login = param => fetch(handleParam('login', param)).then(res => res.json())

export const save = param => fetch(handleParam('saveEdit', param)).then(res => res.json())

export const getType = param => fetch(handleParam('getType', param)).then(res => res.json())

export const editType = param => fetch(handleParam('editType', param)).then(res => res.json())

export const deleteType = param => fetch(handleParam('deleteType', param)).then(res => res.json())

export const getDishes = param => fetch(handleParam('getDishes', param)).then(res => res.json())

export const editDish = param => fetch(handleParam('editDish', param)).then(res => res.json())

export const deleteDish = param => fetch(handleParam('deleteDish', param)).then(res => res.json())

