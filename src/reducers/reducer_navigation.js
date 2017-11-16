// Import section
import {DISPLAY_BREAD,SET_LAST_ITEM} from '../actions/index';
import _ from 'lodash';

// Initializing variables
const INITIAL_STATE = { items: [],lastItem:null};

// Functions
export default function (state = INITIAL_STATE, action) {
	switch (action.type){
		case DISPLAY_BREAD:
			return {...state, items: action.payload }
		case SET_LAST_ITEM:
			if (action.payload == null){
				return { ...state, lastItem: null }
			}
			return { ...state, lastItem: action.payload.data }
		default:
			return state;
	}
}