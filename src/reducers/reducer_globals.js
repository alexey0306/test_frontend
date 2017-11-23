import { SET_SERVICE } from '../actions/index';
import { DEFAULT_SERVICE } from '../globals/globals';

const INITIAL_STATE = { service: DEFAULT_SERVICE };

export default function (state = INITIAL_STATE, action){
	switch (action.type){

		// Setting the global service
		case SET_SERVICE:
			return {...state, service:action.payload }

		default:
			return state;
	}
}