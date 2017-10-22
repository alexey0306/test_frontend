import {FETCH_USERS,FETCH_USER,CREATE_USER,DELETE_USERS,SORT_USERS} from '../actions/index';
import _ from 'lodash';

const INITIAL_STATE = { all:[], user:null };

export default function(state = INITIAL_STATE,action){
	switch (action.type){
		case FETCH_USERS:
			return { ...state, all: action.payload.data};
		case FETCH_USER:
			return { ...state, user: action.payload.data};
		case CREATE_USER:
			return {...state,all: [...state.all, action.payload.data] }
		case DELETE_USERS:
			var array = state.all.filter(function(item){
				return !_.includes(action.payload.data,item.id);
			});
			return {...state, all: array};
		case SORT_USERS:
			var newArray = state.all;
			if (action.payload == "dsc"){
				newArray = newArray.sort(function(a,b){
					return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
				});
			}
			else{
				newArray = newArray.sort(function(a,b){
					return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
				});
			}
			return { ...state, all: newArray};
		default:
			return state;
	}
}