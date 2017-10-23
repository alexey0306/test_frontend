import React from 'react';

// HTML outputs
export const no_users_found = <tr><td colSpan="10" className="not_found"> [ No users found ] </td></tr>;
export const no_groups_found = <tr><td colspan="10" className="not_found"> [ No groups found ] </td></tr>;

// Service IDs
const SERVICE_EVERNOTE = 0;
const SERVICE_ONENOTE = 1;
const EVERNOTE_COLOR = "#2dbe60";
const ONENOTE_COLOR = "#80397B";
const DEFAULT_COLOR = "#dddddd"


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