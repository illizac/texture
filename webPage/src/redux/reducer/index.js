import { combineReducers } from 'redux'
import { Assign } from './toolFunc'
import { REGISTER, 
		 RESET, 
		 LOGINCOMPLETE,
		 STARTLOADING,
		 GETDISH_COMPLETE,
		 ENDLOADING } from '../createAction'

const GlobalDataStructure = { 
	userinfo: {},
	loading: false,
	dishinfo: {
		dishes: [],
		type: [{title: 'default'}]
	}
}

const globalReducer = (state = GlobalDataStructure, action) => {
	switch(action.type){
		case LOGINCOMPLETE: return Assign(state, { userinfo: action.data[0] })
		case GETDISH_COMPLETE: return Assign(state, { dishinfo: action.data })

		case STARTLOADING: return Assign(state, { loading: true })
		case ENDLOADING: return Assign(state, {loading: false})

		case RESET: return GlobalDataStructure

		default: return state
	}
}

export default combineReducers({
		global: globalReducer
})