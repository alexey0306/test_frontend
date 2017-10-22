import {SHOW_ALERT, CLEAR_ALERTS} from '../actions/index';
const INITIAL_STATE = { all:[]};

export default function (state = INITIAL_STATE, action){
	switch (action.type){
		case SHOW_ALERT:
			return {...state, all: [...state.all, action.payload] }
		case CLEAR_ALERTS:
			return {...state, all: [] }
		default:
			return state;
	}
}