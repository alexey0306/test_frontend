// Import section
import axios from 'axios';
import {FETCH_USERS,FETCH_USER,ROOT_URL,REQUEST_TIMEOUT,CREATE_USER,DELETE_USERS, SORT_USERS, TYPE_DANGER,TYPE_SUCCESS,success,handleError} from './index';
import {showAlert,isLoading} from './alerts_actions';
import {setLastItem} from './navigation_actions';

// Variables section
axios.defaults.timeout = REQUEST_TIMEOUT;
var message = "";
// ---------------------------------------------------
// 		Listing users
// ---------------------------------------------------

export function fetchUsers(term = "",sort = "asc",group = ""){
	const URL = `${ROOT_URL}users/list?term=${term}&asc=${sort}&group=${group}`;
	var message = "";
	return function(dispatch){
		dispatch(isLoading(true));
		axios.get(URL)
		.then((response) => {
			dispatch(isLoading(false));
			dispatch(success(response,FETCH_USERS));			
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	}
}

// ---------------------------------------------------
// 		Getting user
// ---------------------------------------------------

export function fetchUser(id){
	const URL = `${ROOT_URL}users/get/${id}`;
	return function(dispatch){
		axios.get(URL)
		.then((response) => {
			dispatch(success(response,FETCH_USER));
			dispatch(setLastItem(response));		
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	}
}

export function createUser(props){

	// Preparing data
	delete props['passwordCnf'];
	const URL = `${ROOT_URL}users/create`;
	props.subject = `CN=${props.name},E=${props.email}`;

	// Sending request and handling the response
	return function(dispatch){
		axios.post(URL,props)
		.then((response) => {
			dispatch(showAlert(TYPE_SUCCESS,"User has been successfully created"));
			dispatch(success(response,CREATE_USER));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	}
}

export function deleteUsers(ids){
	const URL = `${ROOT_URL}users/delete`;
	return function(dispatch){
		dispatch(isLoading(true));
		axios.delete(URL,{data: ids})
		.then((response) => {
			dispatch(isLoading(false));
			dispatch(showAlert(TYPE_SUCCESS,"Users have been successfully deleted"));
			dispatch(success(response,DELETE_USERS));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	}
}

export function sortUsers(sort){
	return {
		type: SORT_USERS,
		payload: sort
	}
}