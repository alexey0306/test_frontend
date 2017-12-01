// Import section
import {SEARCH_FETCH_TAGS, SEARCH_FETCH_SEARCHES, SEARCH_FETCH_RECIPIENTS, SEARCH_FETCH_RECIPIENTS_START} from '../actions/index';
import _ from 'lodash';

// Init section
const INITIAL_STATE = { tags:[], searches:[], recipients:[], loadingRecipients: false};

// Function handling
export default function (state = INITIAL_STATE, action){
	switch (action.type){
		
		// Getting the list of tags
		case SEARCH_FETCH_TAGS:
			return {...state,tags: action.payload.data };

		// Getting the list of Saved Searches
		case SEARCH_FETCH_SEARCHES:
			return {...state,searches: action.payload.data };

		// Getting the list of recipients
		case SEARCH_FETCH_RECIPIENTS_START:
			return {...state,loadingRecipients: true };

		// Getting the list of recipients
		case SEARCH_FETCH_RECIPIENTS:
			return {...state,recipients: action.payload.data, loadingRecipients:false };

		default:
			return state;
	}
}