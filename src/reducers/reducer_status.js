// Import section
import { FETCH_STATUS } from '../actions/index';
import _ from 'lodash';

// Init section
const INITIAL_STATE = { redis:{}, ca:{} };

// Function section
export default function (state = INITIAL_STATE, action){
	switch (action.type){

		case FETCH_STATUS:
			return { ...state, ca:action.payload.data.ca, redis: action.payload.data.redis }

		default:
			return state;
	}
}