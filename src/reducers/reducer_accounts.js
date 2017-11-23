import {FETCH_ACCOUNTS,FETCH_ACCOUNT, CREATE_ACCOUNT,SET_SERVICE} from '../actions/index';
import {DEFAULT_SERVICE} from '../globals/globals';
const INITIAL_STATE = { all: [], account:{},service: DEFAULT_SERVICE };

export default function (state = INITIAL_STATE, action){
	switch (action.type){
		case FETCH_ACCOUNTS:
			return { ...state, all: action.payload.data};
		case FETCH_ACCOUNT:
			return { ...state, account: action.payload.data};
		case CREATE_ACCOUNT:
			return {...state,all: [...state.all, action.payload.data ] }
		case SET_SERVICE:
			// Looking for an account with specified ID
			var accounts = state.all;
			var service = DEFAULT_SERVICE;
			for (var i=0; i<accounts.length; i++){
				if (accounts[i].id == action.payload){
					service = accounts[i].service;
				}
			}
			return {...state, service: service}
		default:
			return state;
	}
}