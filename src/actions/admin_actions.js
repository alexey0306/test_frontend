// Import section
import axios from 'axios';
import {FETCH_ADMIN,ROOT_URL,success,handleError,REQUEST_TIMEOUT} from './index';
import {showAlert,isLoading} from './alerts_actions';
import {custom_axios} from '../globals/helpers';

// ---------------------------------------------------
// 		Getting administrator's info
// ---------------------------------------------------

export function fetchAdmin(){

	const URL = `${ROOT_URL}admin/get`;
	return function(dispatch){

		custom_axios().get(URL)
		.then((response) => {
			dispatch(success(response,FETCH_ADMIN));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});

	}

}