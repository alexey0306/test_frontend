import { FETCH_SECTIONS, FETCH_SECTIONS_START, LIST_SECTIONS } from '../actions/index';
const INITIAL_STATE = { all:[], select:[] };

export default function (state = INITIAL_STATE, action){
	switch (action.type){

		// Starting to fetch the list of sections
		case FETCH_SECTIONS_START:
			return {...state, all:[] }

		// Getting the list of sections
		case FETCH_SECTIONS:
			return {...state, all:action.payload.data }

		// Listing sections for specific policy
		case LIST_SECTIONS:
			// Creating new array
			var arrayVar = state.select.slice();
			arrayVar[action.payload.id] = action.payload.data
		
			// Sending updated state
			return { ...state, select: arrayVar }

		default:
			return state;
	}
}