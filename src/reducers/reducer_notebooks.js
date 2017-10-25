import {FETCH_NOTEBOOKS, SORT_NOTEBOOKS} from '../actions/index';
const INITIAL_STATE = {all: []};

export default function (state = INITIAL_STATE, action) {
	switch (action.type){
		case FETCH_NOTEBOOKS:
			return {...state, all: action.payload.data };
		case SORT_NOTEBOOKS:

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