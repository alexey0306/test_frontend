// Import section
import {FETCH_POLICIES,FETCH_POLICIES_START,FETCH_POLICY,FETCH_POLICY_START,CREATE_POLICY,REQUEST_TIMEOUT, ROOT_URL, success, TYPE_DANGER, handleError} from './index';
import {showAlert,isLoading} from './alerts_actions';
import {custom_axios} from '../globals/helpers';
// ---------------------------------------------------
// 		Fetching policies
// ---------------------------------------------------

export function fetchPolicies(term = ''){
	const URL = `${ROOT_URL}policies/list`;

	return function(dispatch){

		// Displaying progress
		dispatch(success(null,FETCH_POLICIES_START));
		dispatch(isLoading(true));

		// Sending request
		custom_axios().get(URL)
		.then((response) => {
			dispatch(isLoading(false));
			dispatch(success(response,FETCH_POLICIES));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	};
}

// ---------------------------------------------------
// 		Fetching policy
// ---------------------------------------------------

export function fetchPolicy(id){
	const URL = `${ROOT_URL}policies/get/${id}`;
	return function(dispatch){
		dispatch(success(null,FETCH_POLICY_START));
		dispatch(isLoading(true));
		custom_axios().get()
		.then((response) => {
			dispatch(isLoading(false));
			dispatch(success(response,FETCH_POLICY));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	}
}

// ---------------------------------------------------
// 		Creating policy
// ---------------------------------------------------

export function createPolicy(values){
	const URL = `${ROOT_URL}policies/create`;
	return function(dispatch){
		custom_axios().post(URL,values)
		.then((response) => {
			dispatch(isLoading(false));
			dispatch(success(response,CREATE_POLICY));
		})
		.catch((err) => {
			handleError(dispatch,err);
		});
	}
}