// Import section
import axios from 'axios';
import {FETCH_CERTIFICATES_START,FETCH_CERTIFICATES,REQUEST_CERTIFICATES,DELETE_CERTIFICATES,ROOT_URL,REQUEST_TIMEOUT,success,handleError,TYPE_DANGER,TYPE_SUCCESS} from './index';
import {showAlert,isLoading} from './alerts_actions';
axios.defaults.timeout = REQUEST_TIMEOUT;


// ---------------------------------------------------
// 		Listing certificates
// ---------------------------------------------------

export function fetchCertificates(term = ""){
	const URL = `${ROOT_URL}certificates/list?term=${term}`;
	return function(dispatch){

		// Displaying the progress
		dispatch(isLoading(true));
		dispatch(success(null,FETCH_CERTIFICATES_START));

		// Sending request
		axios.get(URL)
		.then((response) => {
			dispatch(isLoading(false));
			dispatch(success(response,FETCH_CERTIFICATES))
		})
		.catch((err) => {
			handleError(dispatch,err);
		});

	}
}

// ---------------------------------------------------
// 		Request certificates
// ---------------------------------------------------

export function requestCertificates(data){
	const URL = `${ROOT_URL}certificates/generate`;
	return function(dispatch){

		// Displaying the progress
		dispatch(isLoading(true));

		// Sending request
		axios.post(URL,data)
		.then((response) => {
			dispatch(isLoading(false));
			dispatch(success(response,REQUEST_CERTIFICATES))
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
		
	}
}

// ---------------------------------------------------
// 		Deleting certificates
// ---------------------------------------------------

export function deleteCertificates(ids){
	const URL = `${ROOT_URL}certificates/delete`;
	return function(dispatch){
		dispatch(isLoading(true));
		axios.delete(URL,{data: ids})
		.then((response) => {
			dispatch(isLoading(false));
			dispatch(showAlert(TYPE_SUCCESS,"Certificates have been successfully deleted"));
			dispatch(success(response,DELETE_CERTIFICATES));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	}
}
