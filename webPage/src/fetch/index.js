import fetch from 'isomorphic-fetch'
import { baseUrl } from '../../baseConf'

const handleParam = (url, param) => {
	let str = `${baseUrl}/web/${url}?`
	for(let i in param){
		str += `${i}=${param[i]}&`
	}

	return str
}


export const register = param => fetch(handleParam('register', param)).then(res => res.json())

export const login = param => fetch(handleParam('login', param)).then(res => res.json())

export const getDish = param => fetch(handleParam('getDish', param)).then(res => res.json())


