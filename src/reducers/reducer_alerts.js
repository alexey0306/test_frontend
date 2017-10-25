import {SHOW_ALERT, CLEAR_ALERTS, HANDLE_LOADER} from '../actions/index';
const INITIAL_STATE = { all:[], loading: false};

export default function (state = INITIAL_STATE, action){
	switch (action.type){
		case SHOW_ALERT:
			return {...state, all: [...state.all, action.payload] }
		case CLEAR_ALERTS:
			return {...state, all: [] }
		case HANDLE_LOADER:
			return { ...state, loading: action.payload }
		default:
			return state;
	}
}