import {
		FETCH_NOTEBOOKS, FETCH_NOTEBOOKS_START,SORT_NOTEBOOKS,
		SET_NOTEBOOK, LIST_NOTEBOOKS,CLEAR_NOTEBOOKS,GET_DEFAULT_NOTEBOOK,
		REQUEST_TIMEOUT,ROOT_URL, 
		success, TYPE_DANGER,TYPE_SUCCESS,handleError,CREATE_TASK
} from './index';
import {custom_axios} from '../globals/helpers';
import {showAlert,isLoading} from './alerts_actions';
import {messages} from '../globals/messages'; 

// ---------------------------------------------------
// 		Fetching notebooks
// ---------------------------------------------------

export function fetchNotebooks(id, refresh = false, term = ""){
	var URL = `${ROOT_URL}notebooks/list/${id}?term=${term}`;
	if (refresh){URL = URL+"&refresh";}

	return function(dispatch){
		
		// Displaying progress
		dispatch(success(null,FETCH_NOTEBOOKS_START));
		
		// Sending request
		custom_axios().get(URL)
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
		custom_axios().get(URL)
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

// ---------------------------------------------------
// 		Encrypting the selected notebooks
// ---------------------------------------------------
export function encryptNotebooks(data){
	const URL = `${ROOT_URL}notebooks/encrypt`;
	return function(dispatch){

		// Sending the request
		custom_axios().post(URL,data)
		.then((response) => {

			// Displaying the response from the server
			dispatch(showAlert(TYPE_SUCCESS,messages.request_sent));

			// Creating the task object
			let task = response.data
			task.url = `${URL}/status`;
			
			// Sending message to reducer
			dispatch(success(task,CREATE_TASK));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});

	}
}