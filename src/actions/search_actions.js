// Import section
import {
	SEARCH_FETCH_TAGS,SEARCH_FETCH_SEARCHES,
	SEARCH_FETCH_RECIPIENTS,SEARCH_FETCH_RECIPIENTS_START,
	SEARCH_FETCH_SEARCHES_START,SEARCH_FETCH_TAGS_START,
	SEARCH_NOTES_START,SEARCH_NOTES,SEARCH_CLEAR_ALL,
	ROOT_URL, REQUEST_TIMEOUT,success,handleError,
	TYPE_DANGER,TYPE_SUCCESS,CREATE_ACCOUNT} from './index';
import {isLoading} from './alerts_actions';
import {custom_axios} from '../globals/helpers';

// Functions

// ---------------------------------------------------
// 		Listing tags
// ---------------------------------------------------

export function fetchTags(account_id){
	const URL = `${ROOT_URL}search/tags/${account_id}`;
	return function(dispatch){

		// Displaying progress
		dispatch(success(null,SEARCH_FETCH_TAGS_START));

		custom_axios().get(URL)
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

		// Displaying progress
		dispatch(success(null,SEARCH_FETCH_SEARCHES_START));

		custom_axios().get(URL)
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

		custom_axios().get(URL)
		.then((response) => {
			dispatch(success(response,SEARCH_FETCH_RECIPIENTS));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	}
}

// ---------------------------------------------------
// 		Searching notes
// ---------------------------------------------------

export function searchNotes(data){
	const URL = `${ROOT_URL}search/notes`;
	return function(dispatch){

		// Displaying progress
		dispatch(isLoading(true));
		dispatch(success(null, SEARCH_NOTES_START));

		// Sending request and processing response
		custom_axios().post(URL,data)
		.then((response) => {
			dispatch(isLoading(false));
			dispatch(success(response,SEARCH_NOTES));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});


	}
}

// ---------------------------------------------------
// 		Clear all
// ---------------------------------------------------

export function clearAll(){
	return function(dispatch){
		dispatch(success(null,SEARCH_CLEAR_ALL));
	}
}
