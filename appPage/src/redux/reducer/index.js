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
		 GETORDERCOMPLETE,
		 GETCOMPLETEDONE,
		 SETHEIGHT,
		 SETCOMPHEIGHT,
		 SAVECOMPLETE } from '../createAction'

const GlobalDataStructure = { 
	userinfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo'))[0] : {},
	loading: false,
	typelist: [],
	dishlist: [],
	typeeditinfo: {},
	dishiteminfo: {},
	orderlist: [],
	completeList: [],
	height: 'auto',
	compHeight: 'auto'
}

const globalReducer = (state = GlobalDataStructure, action) => {
	switch(action.type){
		case LOGINCOMPLETE:
		case SAVECOMPLETE: return Assign(state, { userinfo: action.data[0] })

		case GETTYPESUCCESS: return Assign(state, { typelist: action.data })
		case TYPEEDIT: return Assign(state, { typeeditinfo: action.data })

		case GETDISHCOMPLETE: return Assign(state, { dishlist: action.data })
		case DISHEDIT: return Assign(state, { dishiteminfo: action.data })

		//----------------------------------------------------------------------------------//

		case GETORDERCOMPLETE: return Assign(state, { orderlist: action.data })

		case GETCOMPLETEDONE: return Assign(state, { completeList: action.data })

		//----------------------------------------------------------------------------------//

		case STARTLOADING: return Assign(state, { loading: true })
		case ENDLOADING: return Assign(state, {loading: false})

		case SETHEIGHT: return Assign(state, {height: action.data})
		case SETCOMPHEIGHT: return Assign(state, {compHeight: action.data})

		case RESET: return GlobalDataStructure

		default: return state
	}
}

export default combineReducers({
		global: globalReducer
})