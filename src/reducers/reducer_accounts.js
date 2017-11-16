import {FETCH_ACCOUNTS,FETCH_ACCOUNT, CREATE_ACCOUNT} from '../actions/index';
const INITIAL_STATE = { all: [], account:{} };

export default function (state = INITIAL_STATE, action){
	switch (action.type){
		case FETCH_ACCOUNTS:
			return { ...state, all: action.payload.data};
		case FETCH_ACCOUNT:
			return { ...state, account: action.payload.data};
		case CREATE_ACCOUNT:
			return {...state,all: [...state.all, action.payload.data ] }
		default:
			return state;
	}
}