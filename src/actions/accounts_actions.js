// Import section
import axios from 'axios';
import {FETCH_ACCOUNTS,ROOT_URL,REQUEST_TIMEOUT,success,TYPE_DANGER,TYPE_SUCCESS} from './index';
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