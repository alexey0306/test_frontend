import {
		FETCH_NOTES, SORT_NOTES, REQUEST_TIMEOUT, 
		FETCH_NOTES_START, FETCH_NOTE, FETCH_NOTE_START,CREATE_NOTE, SET_LAST_ITEM,
		DECRYPT_NOTE,CLEAR_DECRYPTED,SET_FAVOURITE,FETCH_FAVOURITES,DELETE_FAVOURITES,
		BATCH_CREATE_NOTES,RESTORE_NOTES,ENCRYPT_NOTES,ROOT_URL, 
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
		axios.post(URL,data)
		.then((response) => {

			// Displaying the result of operation
			dispatch(showAlert(TYPE_SUCCESS,"Request has been successfully sent"));

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

// ---------------------------------------------------
// 		Listing favourites
// ---------------------------------------------------

export function fetchFavourites(data){
	const URL = `${ROOT_URL}notes/favourites/list`;
	return function(dispatch){
		axios.get(URL)
		.then((response) => {

			// Sending the message to reducer
			dispatch(success(response,FETCH_FAVOURITES));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	}
}

// ---------------------------------------------------
// 		Adding/Removing from favourites
// ---------------------------------------------------

export function setFavourite(data){
	const URL = `${ROOT_URL}notes/favourites/set`;
	return function(dispatch){
		axios.post(URL,data)
		.then((response) => {

			// Displaying the notifications
			dispatch(showAlert(TYPE_SUCCESS,"Note status updated"));

			// Sending the message to reducer
			dispatch(success(response,SET_FAVOURITE));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	}
}

// ---------------------------------------------------
// 		Deleting favourites
// ---------------------------------------------------

export function deleteFavourites(ids){
	const URL = `${ROOT_URL}notes/favourites/delete`;
	return function(dispatch){
		dispatch(isLoading(true));
		axios.delete(URL,{data: ids})
		.then((response) => {
			dispatch(isLoading(false));
			dispatch(showAlert(TYPE_SUCCESS,"Items have been successfully removed from favourites"));
			dispatch(success(response,DELETE_FAVOURITES));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	}
}

// ---------------------------------------------------
// 		Batch create
// ---------------------------------------------------

export function batchCreate(data){

	const URL = `${ROOT_URL}notes/batch`;

	// Creating form data
	var formData = new FormData();
	formData.append("method", data.method);
	formData.append("password", data.password);
	formData.append("keys", data.keys);
	formData.append("account", data.account);
	formData.append("split", data.split);

	data.files.map(function(file){
		formData.append("files[]",file);
	});


	return function(dispatch){

		// Sending request
		axios.post(URL,formData,{headers: {'Content-Type': 'multipart/form-data'}})
		.then((response) => {

			// Displaying alert
			dispatch(showAlert(TYPE_SUCCESS,response.data.message));

			// Passing data to reducer
			dispatch(success(response,BATCH_CREATE_NOTES));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});

	}
}

// ---------------------------------------------------
// 		Restoring notes
// ---------------------------------------------------

export function restoreNotes(data){
	const URL = `${ROOT_URL}notes/restore`;
	return function(dispatch){

		axios.post(URL,data)
		.then((response) => {

			// Displaying alert
			dispatch(showAlert(TYPE_SUCCESS,response.data.message));

			// Passing data to reducer
			dispatch(success(response,RESTORE_NOTES));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	}
}

// ---------------------------------------------------
// 		Encrypting existing notes
// ---------------------------------------------------

export function encryptNotes(data){
	const URL = `${ROOT_URL}notes/encrypt`;
	return function(dispatch){

		// Sending request to the server
		axios.post(URL,data)
		.then((response) => {

			// Displaying response from server
			dispatch(showAlert(TYPE_SUCCESS,response.data.message));

			// Passing data to reducer
			dispatch(success(response,ENCRYPT_NOTES));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});


	}
}