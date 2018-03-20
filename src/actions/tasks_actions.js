// Import section
import {DELETE_TASK,success} from './index';

// ---------------------------------------------------
// 		Deleting a task
// ---------------------------------------------------
export function deleteTask(id){
	return function(dispatch){
		// Sending message to reducer
		dispatch(success(id,DELETE_TASK));
	}
}
