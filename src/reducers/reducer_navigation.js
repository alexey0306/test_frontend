// Import section
import {DISPLAY_BREAD,SET_LAST_ITEM,TOGGLE_SIDEBAR} from '../actions/index';
import _ from 'lodash';

// Initializing variables
const INITIAL_STATE = { items: [],lastItem:null,sidebarOpened: false};

// Functions
export default function (state = INITIAL_STATE, action) {
	switch (action.type){

		// Displaying the breadcrumb
		case DISPLAY_BREAD:
			return {...state, items: action.payload }

		// Displaying the last item
		case SET_LAST_ITEM:
			if (action.payload == null){
				return { ...state, lastItem: null }
			}
			return { ...state, lastItem: action.payload.data }

		// Toggling the sidebar
		case TOGGLE_SIDEBAR:			
			return {...state, sidebarOpened: action.payload }
			
		default:
			return state;
	}
}