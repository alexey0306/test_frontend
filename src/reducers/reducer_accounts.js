// Import section
import {FETCH_ACCOUNTS,FETCH_ACCOUNT, CREATE_ACCOUNT,SET_SERVICE,DELETE_ACCOUNT} from '../actions/index';
import {DEFAULT_SERVICE} from '../globals/globals';
import _ from 'lodash';

// Init section
const INITIAL_STATE = { all: [], account:{},service: DEFAULT_SERVICE };

// Function section
export default function (state = INITIAL_STATE, action){
	switch (action.type){

		// Getting the list of accounts
		case FETCH_ACCOUNTS:
			return { ...state, all: action.payload.data};

		// Getting specific account
		case FETCH_ACCOUNT:
			return { ...state, account: action.payload.data};

		// Creating new account
		case CREATE_ACCOUNT:
			return {...state,all: [...state.all, action.payload.data ] }

		// Setting current service
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

		// Deleting account
		case DELETE_ACCOUNT:
			var array = state.all.filter(function(item){
				return !_.includes(action.payload.data,item.id);
			});
			return {...state, all: array};

		default:
			return state;
	}
}