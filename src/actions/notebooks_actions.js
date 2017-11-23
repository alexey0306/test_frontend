import {FETCH_NOTEBOOKS, FETCH_NOTEBOOKS_START,SORT_NOTEBOOKS,SET_NOTEBOOK, LIST_NOTEBOOKS,CLEAR_NOTEBOOKS,REQUEST_TIMEOUT, ROOT_URL, success, TYPE_DANGER, handleError} from './index';
import axios from 'axios';
import {showAlert,isLoading} from './alerts_actions';
axios.defaults.timeout = REQUEST_TIMEOUT;
var message = "";

// ---------------------------------------------------
// 		Fetching notebooks
// ---------------------------------------------------

export function fetchNotebooks(id, refresh = false, term = ""){

	var URL = `${ROOT_URL}notebooks/list/${id}?term=${term}`;
	if (refresh){URL = URL+"&refresh";}

	return function(dispatch){
		dispatch(success(null,FETCH_NOTEBOOKS_START));
		dispatch(isLoading(true));
		axios.get(URL)
		.then((response) => {
			dispatch(isLoading(false));
			dispatch(success(response,FETCH_NOTEBOOKS));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	}

}

// ---------------------------------------------------
// 		Sorting notebooks
// ---------------------------------------------------

export function sortNotebooks(sort,field){
	return {
		type: SORT_NOTEBOOKS,
		payload: {sort: sort, field: field}
	}
}

// ---------------------------------------------------
// 		Listing notebooks for Policies
// ---------------------------------------------------

export function listNotebooks(account_id,policy_id){
	var URL = `${ROOT_URL}notebooks/list/${account_id}?term=`;
	
	return function(dispatch){
		dispatch(isLoading(true));
		axios.get(URL)
		.then((response) => {
			dispatch(isLoading(false));
			dispatch(success({id:policy_id,data:response.data},LIST_NOTEBOOKS));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	}	
}

// ---------------------------------------------------
// 		Clearing the list of notebooks
// ---------------------------------------------------

export function clearNotebooks(){
	return function(dispatch){
		dispatch(success(null,CLEAR_NOTEBOOKS));
	}
}
