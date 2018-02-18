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

function* getType(){
	yield takeLatest(ACTION.GETTYPE, function* (action){
		action.loading ? '' : Toast.loading('Loading...', 0, _ => {})
		let data = yield call(fetchApi.getType, action.param)
		if(data.code == 200){
			yield put({type: ACTION.GETTYPESUCCESS, data: JSON.parse(data.data)})
		}else{
			Toast.Info('获取列表失败')
		}
		yield delay(500)
		action.loading ? '' : Toast.hide()
	})
}


function* editType(){
	yield takeLatest(ACTION.EDITTYPE, function* (action){
		yield put({type: ACTION.STARTLOADING})
		let data = yield call(fetchApi.editType, action.param)
		switch(data.code){
			case 200: 
				Toast.info('操作成功')
				yield delay(500)
				hashHistory.push('/typeList')	
				// yield put({
				// 	type: ACTION.GETTYPE, 
				// 	param: action.param.userid ? {id:  action.param.userid } : {},
				// 	loading: true
				// })
				break
			case 60015:
				Toast.info('分类重复')
				break
			default: 
				Toast.info('操作失败')
				break
		}
		yield delay(300)
		yield put({type: ACTION.ENDLOADING})
	})
}

function* deleteType(){
	yield takeLatest(ACTION.DELETETYPE, function* (action){
		let data = yield call(fetchApi.deleteType, action.param)
		switch(data.code){
			case 200: 
				Toast.info('删除成功')
				yield delay(500)
				hashHistory.push('/typeList')	
				break
			default: 
				Toast.info('删除失败')
				break
		}
	})
}

export function* fetchSaga(){
	yield fork(register)
	yield fork(login)
	yield fork(savechanges)
	yield fork(getType)
	yield fork(editType)
	yield fork(deleteType)
}













































