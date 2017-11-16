// Import section
import {FETCH_CERTIFICATES_START,FETCH_CERTIFICATES, REQUEST_CERTIFICATES,DELETE_CERTIFICATES} from '../actions/index';
import _ from 'lodash';

// Init section
const INITIAL_STATE = { all:[], certificate: null};

// Function handling
export default function (state = INITIAL_STATE, action){
	switch (action.type){
		
		// Starting to fetch the list of certificates
		case FETCH_CERTIFICATES_START:
			return {...state, all: [] }
		
		// Getting a list of certificates
		case FETCH_CERTIFICATES:
			return {...state, all: action.payload.data }

		// Requesting certificates for specified users
		case REQUEST_CERTIFICATES:
			return {...state,all: [...state.all, ...action.payload.data] }
		
		// Deleting specified certificates
		case DELETE_CERTIFICATES:
			var array = state.all.filter(function(item){
				return !_.includes(action.payload.data,item.id);
			});
			return {...state, all: array};

		default:
			return state;
	}
}