// Import section
import axios from 'axios';
import {FETCH_MENU} from '../actions/index';

// Constants
const menu = [
	{name:"Administration",header: true,link:"",icon:""},
	{name:"Users",header: false,link:"users","icon":"users"},
	{name:"Groups",header: false,link:"groups","icon":"users"},
	{name:"Accounts",header: false,link:"accounts","icon":"accounts"},
	{name:"Policies",header: false,link:"policies","icon":"policies"},
	{name:"Tasks",header: false,link:"tasks","icon":"tasks"},
	{name:"Notes",header: true,link:"",icon:""},
	{name:"Create note",header: false,link:"notes/create",icon:""},
	{name:"Favourites",header: false,link:"notes/favourites",icon:""}	
];

export function fetchMenu(){
	return {
		type: FETCH_MENU,
		payload: menu
	};
}