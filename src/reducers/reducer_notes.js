import {FETCH_NOTES, SORT_NOTES, FETCH_NOTES_START, FETCH_NOTE_START, FETCH_NOTE} from '../actions/index';
const INITIAL_STATE = {all: [], note: {} };

export default function (state = INITIAL_STATE, action) {
	switch (action.type){
		
		// Action is fire when we start getting the list of notes from the server
		case FETCH_NOTES_START:
			return {...state, all: [] };
		
		// Action is fired when we start fetching the specific note from the server
		case FETCH_NOTE_START:
			return {...state, note: {}};
		
		// Action is fired when we've fetched the list of notes from the server
		case FETCH_NOTES:
			return {...state, all: action.payload.data };

		// Action is fired when we've downloaded the note from the server
		case FETCH_NOTE:
			return {...state, note: action.payload.data};

		// Action is fired when we want to sort the list of notes
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