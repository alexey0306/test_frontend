import {CHECK_LOGIN,ADMIN_LOGIN,ADMIN_LOGOUT} from '../actions/index';

const INITIAL_STATE = { signedIn:false, token: ''};

export default function (state = INITIAL_STATE, action){
	switch (action.type){
		case CHECK_LOGIN:
			return { ...state, signedIn: action.payload }

		case ADMIN_LOGIN:
			return { ...state, signedIn: true }

		case ADMIN_LOGOUT:
			return { ...state, signedIn: false }

		default:
			return state;
	}
}