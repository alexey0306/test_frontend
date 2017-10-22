// Import section
import axios from 'axios';
import {FETCH_USERS,FETCH_USER,ROOT_URL,REQUEST_TIMEOUT,CREATE_USER,DELETE_USERS, SORT_USERS, TYPE_DANGER,TYPE_SUCCESS} from './index';
import {showAlert} from './alerts_actions';

axios.defaults.timeout = REQUEST_TIMEOUT;
export function fetchUsers(term = "",sort = "asc"){
	const URL = `${ROOT_URL}users/list?term=${term}&asc=${sort}`;
	var message = "";
	return function(dispatch){
		axios.get(URL)
		.then((response) => {dispatch(fetchUsersSuccess(response))})
		.catch((err) => {
			if (err.response){message = err.response.data.message;}
			else{message = err.toString();}
			dispatch(showAlert(TYPE_DANGER,message));
		});
	}
}

function fetchUsersSuccess(response){
	return {
		type: FETCH_USERS,
		payload: response
	}

}

export function fetchUser(id){
	const URL = `${ROOT_URL}users/get/${id}`;
	const request = axios.get(URL);
	return {
		type: FETCH_USER,
		payload: request
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