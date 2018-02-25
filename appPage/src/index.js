import React from 'react'
import ReactDom from 'react-dom'
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'
import { Provider } from 'react-redux'
import { Toast } from 'antd-mobile'

import store from './redux/store'

import Page from './page.jsx'

import Register from './pages/register.jsx'
import Login from './pages/login.jsx'
import Home from './pages/index.jsx'
import Settings from './pages/settings.jsx'
import TypeList from './pages/typeList.jsx'
import TypeForm from './pages/typeForm.jsx'
import DishList from './pages/dishList.jsx'
import DishForm from './pages/dishForm.jsx'
import Qrcode from './pages/qrcode.jsx'

import { gd, cd } from './fetch/toolApi'

const onEnter = (nextState, replace) => {
	let nPath = nextState.location.pathname
	let date = localStorage.getItem('time')
	if( nPath != '/login' && nPath != '/register' && nPath != '/' ){
		if(date){
			if( !cd (gd(0), date) ){
				Toast.info('登录失效')
				replace({ pathname: '/login' })
			}
		}else{
			Toast.info('登录失效')
			replace({ pathname: '/login' })
		}
	}
}

const routeConfig = (
	<Route path = {'/'} onEnter={onEnter} component = {Page}>
		<IndexRedirect to="/login" />
		<Route path = {'/register'} component = {Register} />
		<Route path = {'/login'} component = {Login} />
		<Route path = {'/home'} component = {Home} />
		<Route path = {'/settings'} component = {Settings} />
		<Route path = {'/typeList'} component = {TypeList} />
		<Route path = {'/typeForm'} component = {TypeForm} />
		<Route path = {'/dishList'} component = {DishList} />
		<Route path = {'/dishForm'} component = {DishForm} />
		<Route path = {'/qrcode'} component = {Qrcode} />
	</Route>
)

ReactDom.render(
	<Provider store = { store }>
		<Router history = {hashHistory}>
			{routeConfig}
		</Router>
	</Provider>,
	document.getElementById('root')
)