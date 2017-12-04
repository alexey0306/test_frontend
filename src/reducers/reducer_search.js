// Import section
import {
		SEARCH_FETCH_TAGS, SEARCH_FETCH_SEARCHES, 
		SEARCH_FETCH_RECIPIENTS, SEARCH_FETCH_RECIPIENTS_START,
		SEARCH_FETCH_TAGS_START,SEARCH_FETCH_SEARCHES_START,
		SEARCH_NOTES_START,SEARCH_NOTES,SEARCH_CLEAR_ALL
} from '../actions/index';
import _ from 'lodash';

// Init section
const INITIAL_STATE = { 
	tags:[], 
	searches:[], 
	recipients:[], 
	loadingRecipients: false,
	loadingTags: false,
	loadingSearches:false,
	results:[]

};

// Function handling
export default function (state = INITIAL_STATE, action){
	switch (action.type){

		// Starting to fetch tags
		case SEARCH_FETCH_TAGS_START:
			return {...state,loadingTags:true,tags:[]};
		
		// Getting the list of tags
		case SEARCH_FETCH_TAGS:
			return {...state,tags: action.payload.data,loadingTags:false};

		// Starting to fetch Saved Searches
		case SEARCH_FETCH_SEARCHES_START:
			return {...state,loadingSearches: true,searches:[] };

		// Getting the list of Saved Searches
		case SEARCH_FETCH_SEARCHES:
			return {...state,searches: action.payload.data,loadingSearches: false };

		// Starting to get the list of recipients
		case SEARCH_FETCH_RECIPIENTS_START:
			return {...state,loadingRecipients: true };

		// Getting the list of recipients
		case SEARCH_FETCH_RECIPIENTS:
			return {...state,recipients: action.payload.data, loadingRecipients:false };

		// Starting to search for notes
		case SEARCH_NOTES_START:
			return {...state, results:[]}

		// Sending the results
		case SEARCH_NOTES:
			return {...state, results:action.payload.data}

		// Clear all collections
		case SEARCH_CLEAR_ALL:
			return {...state, tags:[], 
					searches:[],recipients:[],
					loadingTags:false,loadingRecipients:false,loadingSearches:false
			}		

		default:
			return state;
	}
}