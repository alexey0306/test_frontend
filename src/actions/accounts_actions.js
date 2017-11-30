// Import section
import axios from 'axios';
import {FETCH_ACCOUNTS,FETCH_ACCOUNT,DELETE_ACCOUNT,ROOT_URL,REQUEST_TIMEOUT,success,handleError,TYPE_DANGER,TYPE_SUCCESS,CREATE_ACCOUNT} from './index';
import {showAlert,isLoading} from './alerts_actions';
axios.defaults.timeout = REQUEST_TIMEOUT;
var message = "";

// ---------------------------------------------------
// 		Listing accounts
// ---------------------------------------------------

export function fetchAccounts(){
	const URL = `${ROOT_URL}accounts/list`;
	return function(dispatch){
		dispatch(isLoading(true));
		axios.get(URL)
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
		axios.get(URL)
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
		axios.post(URL,values)
		.then((response) => {
			dispatch(success(response,CREATE_ACCOUNT));
			dispatch(showAlert(TYPE_SUCCESS,"Account has been successfully created"));
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
		axios.delete(URL,{data: ids})
		.then((response) => {
			dispatch(isLoading(false));
			dispatch(showAlert(TYPE_SUCCESS,"Accounts have been successfully deleted"));
			dispatch(success(response,DELETE_ACCOUNT));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	}
}
