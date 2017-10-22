import {FETCH_MENU} from '../actions/index';
const INITIAL_STATE = { items:[],active:null};

export default function(state = INITIAL_STATE,action){
	switch (action.type){
		case FETCH_MENU:
			return { ...state, items: action.payload};			
		default:
			return state;
	}
}