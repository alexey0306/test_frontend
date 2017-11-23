// Import section
import { FETCH_TASKS_START, FETCH_TASKS, DELETE_TASKS, FETCH_TASK } from '../actions/index';
import _ from 'lodash';

// Init section
const INITIAL_STATE = { all:[],task:{} };

// Function section
export default function (state = INITIAL_STATE, action){
	switch (action.type){

		// Starting to fetch the list of tasks
		case FETCH_TASKS_START:
			return {...state, all:[] }

		// Getting a list of tasks
		case FETCH_TASKS:
			return {...state, all: action.payload.data }

		// Deleting tasks
		case DELETE_TASKS:
			var array = state.all.filter(function(item){
				return !_.includes(action.payload.data,item.id);
			});
			return {...state, all: array};

		// Getting specific task
		case FETCH_TASK:
			return { ...state, task:action.payload.data }


		default:
			return state;
	}
}