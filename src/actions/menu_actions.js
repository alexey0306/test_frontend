// Import section
import axios from 'axios';
import {FETCH_MENU} from '../actions/index';

// Constants
const menu = [
	{name:"ADMINISTRATION",header: true,link:"",icon:""},
	{name:"Users",header: false,link:"users","icon":"user"},
	{name:"Groups",header: false,link:"groups","icon":"users"},
	{name:"Accounts",header: false,link:"accounts","icon":"object-group"},
	{name:"Policies",header: false,link:"policies","icon":"list"},
	{name:"Certificates",header: false,link:"certificates","icon":"id-card-o"},
	{name:"Tasks",header: false,link:"tasks","icon":"tasks"},
	{name:"",header: false,link:"tasks","icon":"tasks",separator:true},
	{name:"NOTES",header: true,link:"",icon:""},
	{name:"Create note",header: false,link:"create",icon:"sticky-note-o"},
	{name:"Favourites",header: false,link:"favourites",icon:"star"},
	{name:"Batch encryption",header: false,link:"batchencrypt",icon:"upload"},
	{name:"",header: false,link:"tasks","icon":"tasks",separator:true},
];

export function fetchMenu(){
	return {
		type: FETCH_MENU,
		payload: menu
	};
}