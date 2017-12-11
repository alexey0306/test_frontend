// Import section
import axios from 'axios';
import {ADMIN_LOGIN,ROOT_URL,success,handleError} from './index';
import {showAlert,isLoading} from './alerts_actions';
import {setLastItem} from './navigation_actions';
import {browserHistory} from 'react-router';

// Init section


// Functions section

// ---------------------------------------------------
// 		Checking the user's status
// ---------------------------------------------------

export function authenticate(values){

	const URL = `${ROOT_URL}auth/admin/login`;
	return function(dispatch){

		// Displaying progress
		dispatch(isLoading(true));

		// Sending request
		axios.post(URL,values)
		.then((response) => {
			
			// Hiding progress
			dispatch(isLoading(false));

			// Sending message to Reducer to update the state
			dispatch(success(response,ADMIN_LOGIN));

			// Pushing user to main page
			browserHistory.push("/");

			// Saving token into localStorage
			localStorage.setItem('token',response.data.token)
		})
		.catch((err) => {
			handleError(dispatch,err); 
		});		
		
	}
}
