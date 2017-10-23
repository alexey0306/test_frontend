// Import section
import axios from 'axios';
import {FETCH_USERS,FETCH_USER,ROOT_URL,REQUEST_TIMEOUT,CREATE_USER,DELETE_USERS, SORT_USERS, TYPE_DANGER,TYPE_SUCCESS,success} from './index';
import {showAlert} from './alerts_actions';

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
		axios.get(URL)
		.then((response) => {
			dispatch(success(response,FETCH_USERS));			
		})
		.catch((err) => {
			if (err.response){message = err.response.data.message;}
			else{message = err.toString();}
			dispatch(showAlert(TYPE_DANGER,message));
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
		})
		.catch((err) => {
			if (err.response){message = err.response.data.message;}
			else{message = err.toString();}
			dispatch(showAlert(TYPE_DANGER,message));
		});
	}
}

export function createUser(props){

	// Preparing data
	delete props['passwordCnf'];
	const URL = `${ROOT_URL}users/create`;
	props.subject = `CN=${props.name},E=${props.email}`;
	
	// Sending request
	const request = axios.post(URL,props);

	return {
		type: CREATE_USER,
		payload:request
	}
}

export function deleteUsers(ids){
	const URL = `${ROOT_URL}users/delete`;
	const request = axios.delete(URL,{data: ids});
	return {
		type: DELETE_USERS,
		payload:request
	}
}

export function sortUsers(sort){
	return {
		type: SORT_USERS,
		payload: sort
	}
}