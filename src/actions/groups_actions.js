// Import section
import axios from 'axios';
import {FETCH_GROUPS,ROOT_URL,REQUEST_TIMEOUT,CREATE_GROUP,success,handleError,TYPE_DANGER,TYPE_SUCCESS,FETCH_GROUP, DELETE_USERS_GROUP, UPDATE_GROUP, GROUP_USERS, DELETE_GROUPS} from './index';
import {showAlert,isLoading} from './alerts_actions';
import {setLastItem} from './navigation_actions';
import {custom_axios} from '../globals/helpers';
import {messages} from '../globals/messages';


// ---------------------------------------------------
// 		Listing groups
// ---------------------------------------------------

export function fetchGroups(){
	const URL = `${ROOT_URL}groups/list`;
	return function(dispatch){
		
		// Displaying progress
		dispatch(isLoading(true));
		
		// Sending request
		custom_axios().get(URL)
		.then((response) => {

			// Hiding progress
			dispatch(isLoading(false));

			// Sending message to Reducer
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
		custom_axios().post(URL,props)
		.then((response) => {

			// Send message to Reducer
			dispatch(success(response,CREATE_GROUP));
			
			// Display notification
			dispatch(showAlert(TYPE_SUCCESS,messages.group_created_ok));
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
		custom_axios().get(URL)
		.then((response) => {

			// Sending message to Reducer
			dispatch(success(response,FETCH_GROUP));
			
			// Setting the last item in Breadcrumb
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

			// Sending message to Reducer
			dispatch(success(response,DELETE_USERS_GROUP));

			// Display notification
			dispatch(showAlert(TYPE_SUCCESS,messages.group_users_deleted));
		})
		.catch((err) => {

			// Handling error response
			handleError(dispatch,err);
		});

	}
}

// ---------------------------------------------------
// 		Updating the group
// ---------------------------------------------------

export function updateGroup(values){
	const URL = `${ROOT_URL}groups/update/${values.id}`;
	return function(dispatch){
		custom_axios().put(URL,{name: values.name, dscr: values.dscr})
		.then((response) => {

			// Sending message to Reducer
			dispatch(success(response,UPDATE_GROUP));

			// Display notification
			dispatch(showAlert(TYPE_SUCCESS,messages.group_updated));
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
		custom_axios().put(URL,uids)
		.then((response) => {

			// Sending message to Reducer
			dispatch(success(response,GROUP_USERS));

			// Display notification
			dispatch(showAlert(TYPE_SUCCESS,messages.group_users_added));
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

			// Sending message to Reducer
			dispatch(success(response,DELETE_GROUPS));

			// Display notification
			dispatch(showAlert(TYPE_SUCCESS,messages.groups_deleted));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	}

}
