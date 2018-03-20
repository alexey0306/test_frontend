// Import section
import axios from 'axios';
import {
		FETCH_ACCOUNTS,FETCH_ACCOUNT,DELETE_ACCOUNT,ROOT_URL,
		REQUEST_TIMEOUT,success,handleError,
		TYPE_DANGER,TYPE_SUCCESS,CREATE_ACCOUNT,FETCH_DEFAULT_NOTEBOOK,
		CLEAR_DEFAULT_NOTEBOOK,SET_DEFAULT_NOTEBOOK,CLEAR_ACCOUNT,DISCONNECT_ACCOUNT
	} from './index';
import {showAlert,isLoading} from './alerts_actions';
import {custom_axios} from '../globals/helpers';
import {messages} from '../globals/messages';

// ---------------------------------------------------
// 		Listing accounts
// ---------------------------------------------------

export function fetchAccounts(){
	const URL = `${ROOT_URL}accounts/list`;
	return function(dispatch){
		dispatch(isLoading(true));
		custom_axios().get(URL)
		.then((response) => {
			dispatch(isLoading(false));
			dispatch(success(response,FETCH_ACCOUNTS));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	}
}

// ---------------------------------------------------
// 		Getting account info
// ---------------------------------------------------

export function fetchAccount(account_id,service_id){
	const URL = `${ROOT_URL}accounts/get/${account_id}/${service_id}`;
	return function(dispatch){

		// Clearing the previous account information
		dispatch(success(null,CLEAR_ACCOUNT));

		// Sending request for the new account 
		custom_axios().get(URL)
		.then((response) => {
			dispatch(success(response,FETCH_ACCOUNT));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	};
}

// ---------------------------------------------------
// 		Creating new account
// ---------------------------------------------------

export function createAccount(values){
const URL = `${ROOT_URL}accounts/create`;
	return function(dispatch){
		custom_axios().post(URL,values)
		.then((response) => {
			dispatch(success(response,CREATE_ACCOUNT));
			dispatch(showAlert(TYPE_SUCCESS,messages.account_created));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	};
}

// ---------------------------------------------------
// 		Deleting accounts
// ---------------------------------------------------

export function deleteAccount(ids){
	const URL = `${ROOT_URL}accounts/delete`;
	return function(dispatch){
		dispatch(isLoading(true));
		custom_axios().delete(URL,{data: ids})
		.then((response) => {
			dispatch(isLoading(false));
			dispatch(showAlert(TYPE_SUCCESS,messages.accounts_deleted));
			dispatch(success(response,DELETE_ACCOUNT));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	}
}

// ---------------------------------------------------
// 		Getting default notebook
// ---------------------------------------------------

export function fetchDefault(id){

	const URL = `${ROOT_URL}accounts/${id}/default`;

	return function(dispatch){

		// Clearing the default notebook
		dispatch(isLoading(true));
		dispatch(success(null,CLEAR_DEFAULT_NOTEBOOK));

		// Sending the request
		custom_axios().get(URL)
		.then((response) => {

			dispatch(isLoading(false));
			// Sending message to Reducer
			dispatch(success(response,FETCH_DEFAULT_NOTEBOOK));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});

	}
}

// ---------------------------------------------------
// 		Clearing default notebook
// ---------------------------------------------------

export function clearDefaultNotebook(){
	return function(dispatch){
		dispatch(success(null, CLEAR_DEFAULT_NOTEBOOK));
	}
}

// ---------------------------------------------------
// 		Setting default notebook
// ---------------------------------------------------

export function setDefaultNotebook(notebook){
	return function(dispatch){
		dispatch(success(notebook, SET_DEFAULT_NOTEBOOK));
	}
}

// ---------------------------------------------------
// 		Logging out from account
// ---------------------------------------------------

export function disconnectAccount(id){

	// Generating URL
	const URL = `${ROOT_URL}accounts/logout/${id}`;

	// Sending response
	return function(dispatch){

		// Clearing the default notebook
		dispatch(isLoading(true));
		
		// Sending the request
		custom_axios().put(URL)
		.then((response) => {

			// Hiding progress
			dispatch(isLoading(false));
			
			// Sending message to Reducer
			dispatch(success(response,DISCONNECT_ACCOUNT));

			// Displaying the alert
			dispatch(showAlert(TYPE_SUCCESS,messages.account_disconnected));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});


	}
}