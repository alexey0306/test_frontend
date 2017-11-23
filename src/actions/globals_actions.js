// Import section
import {SET_SERVICE,success} from './index';

// ---------------------------------------------------
// 		Changing the global service
// ---------------------------------------------------
export function setService(account_id = -1){
	return function(dispatch){
		dispatch(success(account_id,SET_SERVICE));
	}
}