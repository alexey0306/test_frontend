import {CHECK_LOGIN,ADMIN_LOGIN} from '../actions/index';

const INITIAL_STATE = { signedIn:false, token: ''};

export default function (state = INITIAL_STATE, action){
	switch (action.type){
		case CHECK_LOGIN:
			return { ...state, signedIn: action.payload }

		case ADMIN_LOGIN:
			return { ...state, signedIn: true }

		default:
			return state;
	}
}