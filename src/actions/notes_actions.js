import {
		FETCH_NOTES, SORT_NOTES, REQUEST_TIMEOUT, 
		FETCH_NOTES_START, FETCH_NOTE, FETCH_NOTE_START,ROOT_URL, 
		success, handleError,TYPE_DANGER} from './index';
import axios from 'axios';
import {showAlert,isLoading} from './alerts_actions';
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
		dispatch(isLoading(true));

		// Sending request
		axios.get(URL)
		.then((response) => {
			dispatch(isLoading(false));
			dispatch(success(response,FETCH_NOTE));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});



	};	
}