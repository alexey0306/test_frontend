import {FETCH_NOTEBOOKS, SORT_NOTEBOOKS, REQUEST_TIMEOUT, ROOT_URL, success, TYPE_DANGER} from './index';
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
		dispatch(isLoading(true));
		axios.get(URL)
		.then((response) => {
			dispatch(isLoading(false));
			dispatch(success(response,FETCH_NOTEBOOKS));
		})
		.catch((err) => {
			dispatch(isLoading(false));
			if (err.response){message = err.response.data.message;}
			else{message = err.toString();}
			dispatch(showAlert(TYPE_DANGER,message));
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