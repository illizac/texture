import { takeLatest, delay } from 'redux-saga'
import { put, call, take, fork } from 'redux-saga/effects'
import { hashHistory } from 'react-router'
import { Toast } from 'antd-mobile'
import * as fetchApi from '../../fetch'
import * as ACTION from '../createAction'

function* register(){
	yield takeLatest(ACTION.REGISTER, function* (action){
		let data = yield call(fetchApi.register, action.param)
		switch(data.code){
			case 200: 
				Toast.info('注册成功')
				hashHistory.replace('/login')
				break
			case 60012: 
				Toast.info('用户已存在')
				break
			default: 
				Toast.info('注册失败')
				break
		}
	})
}

function* login(){
	yield takeLatest(ACTION.LOGIN, function* (action){
		let data = yield call(fetchApi.login, action.param)
		switch(data.code){
			case 200: 
				Toast.info('登录成功')
				yield put({type: ACTION.LOGINCOMPLETE, data: JSON.parse(data.data)})
				hashHistory.replace('/home')
				break
			case 60013: 
				Toast.info('账号不存在')
				break
			case 60014: 
				Toast.info('密码错误')
				break
			default: 
				Toast.info('登录失败')
				break
		}
	})
}

function* savechanges(){
	yield takeLatest(ACTION.SAVECHANGES, function* (action){
		yield put({type: ACTION.STARTLOADING})
		let data = yield call(fetchApi.save, action.param)
		switch(data.code){
			case 200: 
				Toast.info('修改成功')
				yield put({type: ACTION.SAVECOMPLETE, data: JSON.parse(data.data)})
				break
			default: 
				Toast.info('修改失败')
				break
		}
		yield delay(300)
		yield put({type: ACTION.ENDLOADING})
	})
}

export function* fetchSaga(){
	yield fork(register)
	yield fork(login)
	yield fork(savechanges)
}