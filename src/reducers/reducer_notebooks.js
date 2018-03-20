// Import section
import {
		FETCH_NOTEBOOKS,FETCH_NOTEBOOKS_START,SORT_NOTEBOOKS,
		CLEAR_NOTEBOOKS,SET_NOTEBOOK, LIST_NOTEBOOKS
} from '../actions/index';

// Initializing variables
const INITIAL_STATE = { all: [], active: {}, notebook_list:[] };

// Functions
export default function (state = INITIAL_STATE, action) {
	switch (action.type){

		// Clearing the list of notebooks
		case CLEAR_NOTEBOOKS:
			return {...state, all:[]};

		// Starting to fetch the list of notebooks
		case FETCH_NOTEBOOKS_START:
			return {...state, all: []}

		// Getting the list of notebooks		
		case FETCH_NOTEBOOKS:
			return {...state, all: action.payload.data };
		
		// Sorting the list of notebooks
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

		// Setting the active notebook for the Breadcrumb component
		case SET_NOTEBOOK:
			return { ...state, active:action.payload }

		// Getting the list of notebooks for Dropdown list
		case LIST_NOTEBOOKS:
			
			// Creating new array
			var arrayVar = state.notebook_list.slice();
			arrayVar[action.payload.id] = action.payload.data
		
			// Sending updated state
			return { ...state, notebook_list: arrayVar }

		default:
			return state;
	}
}