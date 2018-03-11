import React from 'react'
import ReactDom from 'react-dom'
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'
import { Provider } from 'react-redux'

import store from './redux/store'

import Page from './page.jsx'

import Register from './pages/register.jsx'
import Login from './pages/login.jsx'
import Home from './pages/index.jsx'
import Settle from './pages/settle.jsx'
import PayDone from './pages/paydone.jsx'

const onEnter = (nextState, replace) => {
	let nPath = nextState.location.pathname
	if( nPath != '/home' && nPath != '/' ){
		replace({ pathname: '/home' })
	}
}

const routeConfig = (
	<Route path = {'/'} component = {Page} onEnter={onEnter}>
		<IndexRedirect to="/home" />
		<Route path = {'/home'} component = {Home} />
		<Route path = {'/settle'} component = {Settle} />
		<Route path = {'/paydone'} component = {PayDone} />
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