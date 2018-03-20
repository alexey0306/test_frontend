// Import section
import { CREATE_TASK, DELETE_TASK } from '../actions/index';
import _ from 'lodash';

// Init section
const INITIAL_STATE = { all:[],task:{}, tasks:[] };

// Function section
export default function (state = INITIAL_STATE, action){
	switch (action.type){

		// Adding task to the list
		case CREATE_TASK:
			return {...state,tasks: [...state.tasks, action.payload] }

		// Deleting task from list
		case DELETE_TASK:
			var array = state.tasks.filter(function(item){
				return !_.includes(action.payload,item.id);
			});
			return {...state, tasks: array};
		
		default:
			return state;
	}
}