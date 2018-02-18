import { combineReducers } from 'redux'
import { Assign } from './toolFunc'
import { REGISTER, 
		 RESET, 
		 LOGINCOMPLETE,
		 STARTLOADING,
		 ENDLOADING,
		 GETTYPESUCCESS,
		 TYPEEDIT,
		 GETDISHCOMPLETE,
		 DISHEDIT,
		 SAVECOMPLETE } from '../createAction'

const GlobalDataStructure = { 
	userinfo: {},
	loading: false,
	typelist: [],
	dishlist: [],
	typeeditinfo: {},
	dishiteminfo: {}
}

const globalReducer = (state = GlobalDataStructure, action) => {
	switch(action.type){
		case LOGINCOMPLETE:
		case SAVECOMPLETE: return Assign(state, { userinfo: action.data[0] })

		case GETTYPESUCCESS: return Assign(state, { typelist: action.data })
		case TYPEEDIT: return Assign(state, { typeeditinfo: action.data })

		case GETDISHCOMPLETE: return Assign(state, { dishlist: action.data })
		case DISHEDIT: return Assign(state, { dishiteminfo: action.data })

		case STARTLOADING: return Assign(state, { loading: true })
		case ENDLOADING: return Assign(state, {loading: false})

		case RESET: return GlobalDataStructure

		default: return state
	}
}

export default combineReducers({
		global: globalReducer
})