import {FETCH_GROUPS,CREATE_GROUP,FETCH_GROUP, DELETE_USERS_GROUP, UPDATE_GROUP, GROUP_USERS} from '../actions/index';
import _ from 'lodash';
const INITIAL_STATE = { all:[],group:{name:"",dscr:"",users:[],id:0} };

export default function(state = INITIAL_STATE,action){
	switch (action.type){
		case FETCH_GROUPS:
			if (!action.payload){return {...state, all: [] }}
			if (action.payload.status == 200){
				return { ...state, all: action.payload.data};
			}
			else{return {...state, all: [] }}	
		case CREATE_GROUP:
			return {...state,all: [...state.all, action.payload.data] }
		case FETCH_GROUP:
			return {...state, group: action.payload.data };
		case DELETE_USERS_GROUP:
			return {...state, group: action.payload.data};
		case UPDATE_GROUP:
			return {...state, group: action.payload.data}
		case GROUP_USERS:
			return state;
		default:
			return state;
	}
}