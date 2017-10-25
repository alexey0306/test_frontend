// Import section
import axios from 'axios';
import {FETCH_ACCOUNTS,FETCH_ACCOUNT,ROOT_URL,REQUEST_TIMEOUT,success,TYPE_DANGER,TYPE_SUCCESS,CREATE_ACCOUNT} from './index';
import {showAlert} from './alerts_actions';
axios.defaults.timeout = REQUEST_TIMEOUT;
var message = "";

// ---------------------------------------------------
// 		Listing accounts
// ---------------------------------------------------

export function fetchAccounts(){
	const URL = `${ROOT_URL}accounts/list`;
	return function(dispatch){
		axios.get(URL)
		.then((response) => {
			dispatch(success(response,FETCH_ACCOUNTS));
		})
		.catch((err) => {
			if (err.response){message = err.response.data.message;}
			else{message = err.toString();}
			dispatch(showAlert(TYPE_DANGER,message));
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
			if (err.response){message = err.response.data.message;}
			else{message = err.toString();}
			dispatch(showAlert(TYPE_DANGER,message));
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
			if (err.response){message = err.response.data.message;}
			else{message = err.toString();}
			dispatch(showAlert(TYPE_DANGER,message));
		});
	};
}
