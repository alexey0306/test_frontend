import {FETCH_GROUPS,CREATE_GROUP,FETCH_GROUP} from '../actions/index';
const INITIAL_STATE = { all:[],group:null };

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
			return {...state,group: action.payload.data };
		default:
			return state;
	}
}