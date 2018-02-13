import React from 'react'
import ReactDom from 'react-dom'
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'
import { Provider } from 'react-redux'

import store from './redux/store'

import Page from './page.jsx'

import Register from './pages/register.jsx'
import Login from './pages/login.jsx'
import Home from './pages/index.jsx'
import Settings from './pages/settings.jsx'

const routeConfig = (
	<Route path = {'/'} component = {Page}>
		<IndexRedirect to="/login" />
		<Route path = {'/register'} component = {Register} />
		<Route path = {'/login'} component = {Login} />
		<Route path = {'/home'} component = {Home} />
		<Route path = {'/settings'} component = {Settings} />
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