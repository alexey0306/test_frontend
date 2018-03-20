// Import section
import {
		FETCH_ACCOUNTS,FETCH_ACCOUNT, CREATE_ACCOUNT,SET_SERVICE,
		DELETE_ACCOUNT,FETCH_DEFAULT_NOTEBOOK,CLEAR_DEFAULT_NOTEBOOK,
		SET_DEFAULT_NOTEBOOK,CLEAR_ACCOUNT,DISCONNECT_ACCOUNT
} from '../actions/index';
import {DEFAULT_SERVICE} from '../globals/globals';
import _ from 'lodash';

// Init section
const INITIAL_STATE = { 
	all: [], account:null,
	service: DEFAULT_SERVICE,selected:null, 
	defaultNotebook: null
};

// Function section
export default function (state = INITIAL_STATE, action){
	switch (action.type){

		// Getting the list of accounts
		case FETCH_ACCOUNTS:
			return { ...state, all: action.payload.data};

		// Getting specific account
		case FETCH_ACCOUNT:
			return { ...state, account: action.payload.data};

		// Clearing current account
		case CLEAR_ACCOUNT:
			return { ...state, account: action.payload};			

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

		// Getting default notebook
		case FETCH_DEFAULT_NOTEBOOK:
			return { ...state, defaultNotebook: action.payload.data }

		// Getting default notebook
		case SET_DEFAULT_NOTEBOOK:
			return { ...state, defaultNotebook: action.payload }

		// Clearing the default notebook
		case CLEAR_DEFAULT_NOTEBOOK:
			return { ...state, defaultNotebook: null };

		// Disconnecting the account
		case DISCONNECT_ACCOUNT:

			// Getting the list of current accounts
			let accounts = state.all.slice();

			// Getting updated account
			let account = action.payload.data;
			account.loggedIn = false;

			// Looking for a specific project
			for (var i in accounts){

				if (accounts[i].id == account.id){
					accounts[i].loggedIn = false;
				}
			}
			
			return { ...state, all: accounts };

		default:
			return state;
	}
}