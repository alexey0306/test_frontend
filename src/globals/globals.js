import React from 'react';

// HTML outputs
export const no_users_found = <tr><td colSpan="10" className="not_found"> [ No users found ] </td></tr>;
export const no_groups_found = <tr><td colSpan="10" className="not_found"> [ No groups found ] </td></tr>;
export const no_notebooks_found = <tr><td colSpan="10" className="not_found"> [ No notebooks found ] </td></tr>;
export const no_accounts_found = <li  className='list-group-item'> No accounts found </li>;

// Service IDs
export const SERVICE_EVERNOTE = 0;
export const SERVICE_ONENOTE = 1;
const EVERNOTE_COLOR = "#2dbe60";
const ONENOTE_COLOR = "#80397B";
const DEFAULT_COLOR = "#dddddd"

// Supported services
export const SUPPORTED_SERVICES = [
	{id: SERVICE_EVERNOTE, name: "Evernote"},
	{id: SERVICE_ONENOTE, name: "Onenote"}	
]

// Premium status and Privileges
export const PREMIUM_STATUS = {
	"0": "None",
	"1":"Pending",
	"2":"Active",
	"3":"FAILED",
	"4":"Cancellation pending",
	"5":"CANCELLED"
}

export const PRIVILEGE_LEVEL = {"1":"Normal","3":"Premium"};




// Functions
export function get_account(service_id){
	switch(service_id){
		case SERVICE_ONENOTE:
			return ONENOTE_COLOR;
		case SERVICE_EVERNOTE:
			return EVERNOTE_COLOR;
		default:
			return DEFAULT_COLOR;
	}
}