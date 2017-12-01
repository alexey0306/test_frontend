// Import section
import axios from 'axios';
import {SEARCH_FETCH_TAGS,SEARCH_FETCH_SEARCHES,SEARCH_FETCH_RECIPIENTS,SEARCH_FETCH_RECIPIENTS_START,ROOT_URL, REQUEST_TIMEOUT,success,handleError,TYPE_DANGER,TYPE_SUCCESS,CREATE_ACCOUNT} from './index';
import {showAlert,isLoading} from './alerts_actions';

// Init section
axios.defaults.timeout = REQUEST_TIMEOUT;

// Functions

// ---------------------------------------------------
// 		Listing tags
// ---------------------------------------------------

export function fetchTags(account_id){
	const URL = `${ROOT_URL}search/tags/${account_id}`;
	return function(dispatch){
		axios.get(URL)
		.then((response) => {
			dispatch(success(response,SEARCH_FETCH_TAGS));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});

	}
}

// ---------------------------------------------------
// 		Listing Saved Searches
// ---------------------------------------------------

export function fetchSearches(account_id){
	const URL = `${ROOT_URL}search/searches/${account_id}`;
	return function(dispatch){
		axios.get(URL)
		.then((response) => {
			dispatch(success(response,SEARCH_FETCH_SEARCHES));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});

	}
}

// ---------------------------------------------------
// 		Listing Recipients
// ---------------------------------------------------

export function fetchRecipients(){
	const URL = `${ROOT_URL}search/recipients`;
	return function(dispatch){

		// Displaying progress
		dispatch(success(null,SEARCH_FETCH_RECIPIENTS_START));

		axios.get(URL)
		.then((response) => {
			dispatch(success(response,SEARCH_FETCH_RECIPIENTS));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	}
}
