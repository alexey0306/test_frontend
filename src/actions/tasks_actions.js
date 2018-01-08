// Import section
import axios from 'axios';
import {FETCH_TASKS_START, FETCH_TASKS, FETCH_TASK, DELETE_TASKS,ROOT_URL,REQUEST_TIMEOUT,success,handleError,TYPE_DANGER,TYPE_SUCCESS} from './index';
import {showAlert,isLoading} from './alerts_actions';
import {custom_axios} from '../globals/helpers';


// ---------------------------------------------------
// 		Fetching tasks
// ---------------------------------------------------

export function fetchTasks(){
	const URL = `${ROOT_URL}tasks/list`;

	return function(dispatch){

		// Displaying progress
		dispatch(success(null,FETCH_TASKS_START));
		dispatch(isLoading(true));

		custom_axios().get(URL)
		.then((response) => {
			dispatch(isLoading(false));
			dispatch(success(response,FETCH_TASKS));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});

	};
}

// ---------------------------------------------------
// 		Fetching specific task
// ---------------------------------------------------

export function fetchTask(id){
	const URL = `${ROOT_URL}tasks/get/${id}`;
	return function(dispatch){
		axios.get(URL)
		.then((response) => {
			dispatch(success(response,FETCH_TASK));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	}
}

// ---------------------------------------------------
// 		Deleting tasks
// ---------------------------------------------------

export function deleteTasks(ids){
	const URL = `${ROOT_URL}tasks/delete`;
	return function(dispatch){
		dispatch(isLoading(true));
		axios.delete(URL,{data: ids})
		.then((response) => {
			dispatch(isLoading(false));
			dispatch(showAlert(TYPE_SUCCESS,"Tasks have been successfully deleted"));
			dispatch(success(response,DELETE_TASKS));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	}
}
