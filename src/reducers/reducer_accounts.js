import {FETCH_ACCOUNTS} from '../actions/index';
const INITIAL_STATE = { all: [], account:{} };

export default function (state = INITIAL_STATE, action){
	switch (action.type){
		case FETCH_ACCOUNTS:
			return { ...state, all: action.payload.data};
		default:
			return state;
	}
}