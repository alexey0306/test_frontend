// Import section
import {FETCH_ADMIN} from '../actions/index';

// Init section
const INITIAL_STATE = { admin: {} }

// Functions sectionm
export default function (state = INITIAL_STATE, action){
	switch (action.type){
		
		// Getting administrator's info
		case FETCH_ADMIN:
			
			if (action.payload.data.admin){
				return {...state, admin: action.payload.data.admin }
			}
			else if (action.payload.data){
				return {...state, admin: action.payload.data }	
			}
			else{
				return state;
			}

		default:
			return state;
	}
}