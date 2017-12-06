// Import section
import axios from 'axios';
import {
		FETCH_SECTIONS_START, FETCH_SECTIONS, LIST_SECTIONS,ENCRYPT_SECTIONS,SEARCH_SECTIONS,
		ROOT_URL,REQUEST_TIMEOUT,success,handleError,
		TYPE_DANGER,TYPE_SUCCESS} from './index';
import {showAlert,isLoading} from './alerts_actions';
axios.defaults.timeout = REQUEST_TIMEOUT;


// ---------------------------------------------------
// 		Fetching sections
// ---------------------------------------------------

export function fetchSections(account_id,guid,refresh = false){
	var URL = `${ROOT_URL}sections/${account_id}/list/${guid}`;
	if (refresh){URL = URL+"?refresh";}
	return function(dispatch){

		// Displaying progress
		dispatch(success(null,FETCH_SECTIONS_START));
		dispatch(isLoading(true));
		axios.get(URL)
		.then((response) => {
			dispatch(isLoading(false));
			dispatch(success(response,FETCH_SECTIONS));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});

	};
}

// ---------------------------------------------------
// 		Listing sections for specific policy
// ---------------------------------------------------

export function listSections(account_id,guid,policy_id){
	var URL = `${ROOT_URL}sections/${account_id}/list/${guid}?refresh`;
	return function(dispatch){
		// Displaying progress
		axios.get(URL)
		.then((response) => {
			dispatch(success({id: policy_id, data: response.data},LIST_SECTIONS));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});

	};
}

// ---------------------------------------------------
// 		Encrypting the selected sections
// ---------------------------------------------------
export function encryptSections(data){
	const URL = `${ROOT_URL}sections/encrypt`;
	return function(dispatch){

		// Sending the request
		axios.post(URL,data)
		.then((response) => {
			dispatch(showAlert(response.data.type,response.data.message))
			dispatch(success(response,ENCRYPT_SECTIONS));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});

	}
}

// ---------------------------------------------------
// 		Searching sections
// ---------------------------------------------------
export function searchSections(term){
	return function(dispatch){
		dispatch(success(term,SEARCH_SECTIONS));
	}
}