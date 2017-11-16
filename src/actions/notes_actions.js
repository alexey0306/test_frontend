import {
		FETCH_NOTES, SORT_NOTES, REQUEST_TIMEOUT, 
		FETCH_NOTES_START, FETCH_NOTE, FETCH_NOTE_START,CREATE_NOTE, SET_LAST_ITEM,
		DECRYPT_NOTE,CLEAR_DECRYPTED,ROOT_URL, 
		success, handleError,TYPE_DANGER,TYPE_SUCCESS} from './index';
import axios from 'axios';
import {showAlert,isLoading} from './alerts_actions';
import {showNotification} from '../globals/helpers';
import {setLastItem} from './navigation_actions';

axios.defaults.timeout = REQUEST_TIMEOUT;

// ---------------------------------------------------
// 		Fetching notes
// ---------------------------------------------------

export function fetchNotes(id, guid, refresh = false, term = "", type = "notebooks", display = 0){

	var URL = `${ROOT_URL}notes/${id}/list/${guid}?term=${term}&type=${type}&display=${display}`;
	if (refresh){URL = URL+"&refresh";}

	return function(dispatch){
		dispatch(success(null,FETCH_NOTES_START));
		dispatch(isLoading(true));
		axios.get(URL)
		.then((response) => {
			dispatch(isLoading(false));
			dispatch(success(response,FETCH_NOTES));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	}

}

// ---------------------------------------------------
// 		Sorting notes
// ---------------------------------------------------

export function sortNotes(sort,field){
	return {
		type: SORT_NOTES,
		payload: {sort: sort, field: field}
	}
}

// ---------------------------------------------------
// 		Getting note
// ---------------------------------------------------

export function fetchNote(id,guid){
	const URL = `${ROOT_URL}notes/${id}/get/${guid}`;
	return function(dispatch){
		
		// Managing the progress
		dispatch(success(null,FETCH_NOTE_START));
		dispatch(setLastItem(null,SET_LAST_ITEM))

		// Sending request
		axios.get(URL)
		.then((response) => {
			dispatch(setLastItem(response,SET_LAST_ITEM))
			dispatch(success(response,FETCH_NOTE));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});



	};	
}

// ---------------------------------------------------
// 		Create note
// ---------------------------------------------------

export function createNote(data){
	const URL = `${ROOT_URL}notes/create`;
	return function(dispatch){
		
		// Sending the request
		console.log(data);
		axios.post(URL,data)
		.then((response) => {

			// Displaying the result of operation
			showNotification("Creating note",response.data.message,TYPE_SUCCESS);

			// Sending message to reducer
			dispatch(success(response, CREATE_NOTE));

		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	}
}

// ---------------------------------------------------
// 		Decrypting note
// ---------------------------------------------------

export function decryptNote(data){

	const URL = `${ROOT_URL}notes/decrypt`;
	return function(dispatch){

		// Sending the decrypt request
		axios.post(URL,data)
		.then((response) => {
			dispatch(success(response,DECRYPT_NOTE));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});

	}
}

// ---------------------------------------------------
// 		Clearing the decrypted note
// ---------------------------------------------------

export function clearNote(){
	return function(dispatch){
		dispatch(success(null,CLEAR_DECRYPTED));
	}
}