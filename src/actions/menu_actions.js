// Import section
import axios from 'axios';
import {FETCH_MENU} from '../actions/index';

// Constants
const menu = [
	{id:1,name:"ADMINISTRATION",header: true,link:"",icon:""},
	{id:0,name:"Home",header: false,link:"/","icon":"home"},
	{id:2,name:"Users",header: false,link:"users","icon":"user"},
	{id:3,name:"Groups",header: false,link:"groups","icon":"users"},
	{id:4,name:"Accounts",header: false,link:"accounts","icon":"object-group"},
	{id:5,name:"Policies",header: false,link:"policies","icon":"list"},
	{id:6,name:"Certificates",header: false,link:"certificates","icon":"id-card-o"},
	{id:7,name:"Tasks",header: false,link:"tasks","icon":"tasks"},
	{id:8,name:"",header: false,link:"tasks","icon":"tasks",separator:true},
	{id:9,name:"NOTES",header: true,link:"",icon:""},
	{id:10,name:"Create note",header: false,link:"create",icon:"sticky-note-o"},
	{id:11,name:"Favourites",header: false,link:"favourites",icon:"star"},
	{id:12,name:"Batch encryption",header: false,link:"batch_create",icon:"upload"},
	{id:13,name:"Advanced Search",header: false,link:"search",icon:"search"},
	{id:14,name:"",header: false,link:"tasks","icon":"tasks",separator:true},
];

export function fetchMenu(){
	return {
		type: FETCH_MENU,
		payload: menu
	};
}