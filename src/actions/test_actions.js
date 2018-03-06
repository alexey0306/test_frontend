// Import section
import {CREATE_TASK,success,handleError,ROOT_URL} from './index';
import {custom_axios} from '../globals/helpers';

// Initializing a test action
export function testAction(){

	const URL = `${ROOT_URL}tasks/longtask`;
	return function(dispatch){

		custom_axios().get(URL)
		.then((response) => {
			
			// Sending message to reducer
			dispatch(success(response,CREATE_TASK));
			
		})
		.catch((err) => {
			handleError(dispatch,err); 
		});

	}

}