// Import section
import axios from 'axios';
import {FETCH_GROUPS,ROOT_URL,REQUEST_TIMEOUT,CREATE_GROUP,success,handleError,TYPE_DANGER,TYPE_SUCCESS,FETCH_GROUP, DELETE_USERS_GROUP, UPDATE_GROUP, GROUP_USERS, DELETE_GROUPS} from './index';
import {showAlert,isLoading} from './alerts_actions';
import {setLastItem} from './navigation_actions';
axios.defaults.timeout = REQUEST_TIMEOUT;
var message = "";


// ---------------------------------------------------
// 		Listing groups
// ---------------------------------------------------

export function fetchGroups(){
	const URL = `${ROOT_URL}groups/list`;
	var message = "";
	return function(dispatch){
		dispatch(isLoading(true));
		axios.get(URL)
		.then((response) => {
			dispatch(isLoading(false));
			dispatch(success(response,FETCH_GROUPS));
		})
		.catch((err) => {
			handleError(dispatch,err);
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
			handleError(dispatch,err);
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
		.then((response) => {
			dispatch(success(response,FETCH_GROUP));
			dispatch(setLastItem(response));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	}
}

// ---------------------------------------------------
// 		Deleting users from the group
// ---------------------------------------------------

// Function used to delete the users from specific group
//  > group_id = The Group ID
//  > uids = array of User IDs to be kept in the group
export function deleteUsers(group_id,uids){
	const URL = `${ROOT_URL}groups/delusers/${group_id}`;
	return function(dispatch){

		// Sending request
		axios.put(URL,uids)
		.then((response) => {
			dispatch(success(response,DELETE_USERS_GROUP));
			dispatch(showAlert(TYPE_SUCCESS,"Users have been successfully deleted from the group"));
		})
		.catch((err) => {handleError(dispatch,err);});

	}
}

// ---------------------------------------------------
// 		Updating the group
// ---------------------------------------------------

export function updateGroup(values){
	const URL = `${ROOT_URL}groups/update/${values.id}`;
	return function(dispatch){
		axios.put(URL,{name: values.name, dscr: values.dscr})
		.then((response) => {
			dispatch(success(response,UPDATE_GROUP));
			dispatch(showAlert(TYPE_SUCCESS,"Group has been successfully updated"));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	}
}

// ---------------------------------------------------
// 		Grouping users
// ---------------------------------------------------

export function groupUsers(group, uids){
	console.log(uids);
	
	const URL = `${ROOT_URL}groups/addusers/${group}`;
	return function(dispatch){
		axios.put(URL,uids)
		.then((response) => {
			dispatch(success(response,GROUP_USERS));
			dispatch(showAlert(TYPE_SUCCESS,"Users have been successfully added to the group"));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	}
}

// ---------------------------------------------------
// 		Deleting groups
// ---------------------------------------------------

export function deleteGroups(groups){
	const URL = `${ROOT_URL}groups/delete`;
	return function(dispatch){

		// Sending request
		axios.delete(URL,{data: groups})
		.then((response) => {
			dispatch(success(response,DELETE_GROUPS));
			dispatch(showAlert(TYPE_SUCCESS,"Groups have been successfully deleted"));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	}

}
