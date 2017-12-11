// Import section
import {FETCH_STATUS,success} from './index';
import {custom_axios} from '../globals/helpers';

// ---------------------------------------------------
// 		Changing the global service
// ---------------------------------------------------
export function fetchStatus(){

	const URL = `${ROOT_URL}status`;

	return function(dispatch){
		
		custom_axios().get(URL)
		.then((response) => {
			
			// Sending message to reducer
			dispatch(success(response,FETCH_STATUS));
			
		})
		.catch((err) => {
			handleError(dispatch,err); 
		});

	}
}