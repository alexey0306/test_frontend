import {CHECK_LOGIN} from '../actions/index';

const INITIAL_STATE = { loggedIn:false, token: ''};

export default function (state = INITIAL_STATE, action){
	switch (action.type){
		case CHECK_LOGIN:
			return { ...state, isLogged: action.payload }
		default:
			return state;
	}
}