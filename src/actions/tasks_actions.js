// Import section
import axios from 'axios';
import {FETCH_TASKS_START, FETCH_TASKS,ROOT_URL,REQUEST_TIMEOUT,success,handleError,TYPE_DANGER,TYPE_SUCCESS} from './index';
import {showAlert,isLoading} from './alerts_actions';
axios.defaults.timeout = REQUEST_TIMEOUT;


// ---------------------------------------------------
// 		Fetching tasks
// ---------------------------------------------------

export function fetchTasks(){
	const URL = `${ROOT_URL}tasks/list`;

	return function(dispatch){

		// Displaying progress
		dispatch(success(null,FETCH_TASKS_START));
		dispatch(isLoading(true));

		axios.get()
		.then((response) => {
			dispatch(isLoading(false));
			dispatch(success(response,FETCH_TASKS));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});

	};
}