import {FETCH_POLICIES,FETCH_POLICY, FETCH_POLICIES_START, FETCH_POLICY_START, CREATE_POLICY} from '../actions/index';
const INITIAL_STATE = { all: [], policy:{} };

export default function(state = INITIAL_STATE, action){
	switch(action.type){

		// Starting to get the list of policies
		case FETCH_POLICIES_START:
			return { ...state, all: [] }

		// Getting the list of policies
		case FETCH_POLICIES:
			return { ...state, all: action.payload.data }

		// Starting to fetch policy
		case FETCH_POLICY_START:
			return { ...state, policy: {} }

		// Getting specific policy
		case FETCH_POLICY:
			return { ...state, policy: action.payload }

		// Creating new policy
		case CREATE_POLICY:
			return state;

		default:
			return state;
	}
}