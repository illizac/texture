import { takeLatest, delay } from 'redux-saga'
import { put, call, take, fork } from 'redux-saga/effects'
import { hashHistory } from 'react-router'
import { Toast } from 'antd-mobile'
import * as fetchApi from '../../fetch'
import * as ACTION from '../createAction'
import { qs } from '../../fetch/toolApi'


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
				hashHistory.replace(`/home`)
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

function* getDish(){
	yield takeLatest(ACTION.GETDISH, function* (action){
		// yield put({type: STARTLOADING})
		Toast.loading('Loading...')
		let data = yield call(fetchApi.getDish, action.param)
		switch(data.code){
			case 200: 
				yield put({type: ACTION.GETDISH_COMPLETE, data: JSON.parse(data.data)})
				document.title = JSON.parse(data.data).nickname
				break
			default: 
				Toast.info('获取失败，请重试')
				break
		}

		yield delay(300)
		Toast.hide()
	})
}


function* settle(){
	yield takeLatest(ACTION.SETTLE, function* (action){
		Toast.loading('Loading...')
		let data = yield call(fetchApi.settle, action.param)
		switch(data.code){
			case 200: 
				Toast.info('支付成功')
				hashHistory.replace('/paydone')
				break
			default: 
				Toast.info('支付失败，请稍后再试')
				break
		}

		yield delay(300)
		Toast.hide()
	})
}




export function* fetchSaga(){
	yield fork(register)
	yield fork(login)
	yield fork(getDish)
	yield fork(settle)

}













































