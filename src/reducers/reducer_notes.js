import {FETCH_NOTES, SORT_NOTES, FETCH_NOTES_START} from '../actions/index';
const INITIAL_STATE = {all: [], note: {} };

export default function (state = INITIAL_STATE, action) {
	switch (action.type){
		case FETCH_NOTES_START:
			return {...state, all: []}
		case FETCH_NOTES:
			return {...state, all: action.payload.data };
		case SORT_NOTES:

			// Creating a new array
			var newArray = state.all;
			// Checking the sort order
			if (action.payload.sort == "dsc"){
				newArray = newArray.sort(function(a,b){
					return b[action.payload.field].toLowerCase().localeCompare(a[action.payload.field].toLowerCase());
				});
			}
			else{
				newArray = newArray.sort(function(a,b){
					return a[action.payload.field].toLowerCase().localeCompare(b[action.payload.field].toLowerCase());
				});
			}
			return { ...state, all: newArray }

		default:
			return state;
	}
}