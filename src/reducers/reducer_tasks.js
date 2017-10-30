import { FETCH_TASKS_START, FETCH_TASKS } from '../actions/index';
const INITIAL_STATE = { all:[] };

export default function (state = INITIAL_STATE, action){
	switch (action.type){

		// Starting to fetch the list of tasks
		case FETCH_TASKS_START:
			return {...state, all:[] }

		// Getting a list of tasks
		case FETCH_TASKS:
			return {...state, all: action.payload.data }

		default:
			return state;
	}
}