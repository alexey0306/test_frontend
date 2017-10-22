// Import section
import axios from 'axios';
import {FETCH_GROUPS,ROOT_URL,REQUEST_TIMEOUT,CREATE_GROUP,success,TYPE_DANGER,TYPE_SUCCESS,FETCH_GROUP} from './index';
import {showAlert} from './alerts_actions';
axios.defaults.timeout = REQUEST_TIMEOUT;
var message = "";

// ---------------------------------------------------
// 		Listing groups
// ---------------------------------------------------

export function fetchGroups(){
	const URL = `${ROOT_URL}groups/list`;
	var message = "";
	return function(dispatch){
		axios.get(URL)
		.then((response) => {dispatch(success(response,FETCH_GROUPS));})
		.catch((err) => {
			if (err.response){message = err.response.data.message;}
			else{message = err.toString();}
			dispatch(showAlert(TYPE_DANGER,message));
		});
	}
}

// ---------------------------------------------------
// 		Creating groups
// ---------------------------------------------------
export function createGroup(props){
	const URL = `${ROOT_URL}groups/create`;
	
	return function(dispatch){
		axios.post(URL,props)
		.then((response) => {
			dispatch(success(response,CREATE_GROUP));
			dispatch(showAlert(TYPE_SUCCESS,"Group has been successfully created"));
		})
		.catch((err) => {
			if (err.response){message = err.response.data.message;}
			else{message = err.toString();}
			dispatch(showAlert(TYPE_DANGER,message));
		});
	};
}

// ---------------------------------------------------
// 		Getting specific group
// ---------------------------------------------------

export function fetchGroup(id){
	const URL = `${ROOT_URL}groups/get/${id}`;
	return function(dispatch){
		axios.get(URL)
		.then((response) => {dispatch(success(response,FETCH_GROUP));})
		.catch((err) => {
			if (err.response){message = err.response.data.message;}
			else{message = err.toString();}
			dispatch(showAlert(TYPE_DANGER,message));
		});
	}
}
