// Import section
import {DISPLAY_BREAD,SET_LAST_ITEM,success} from './index';

// Function sections
export function displayBread(items){
	return function(dispatch){
		dispatch(success(items,DISPLAY_BREAD));
	}
}

export function setLastItem(item){
	return function(dispatch){
		dispatch(success(item,SET_LAST_ITEM));
	}
}

