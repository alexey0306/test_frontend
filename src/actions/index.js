import {showAlert,isLoading} from './alerts_actions';

// Export section
export const ROOT_URL = "https://www.saferoomapp.com:5000/";
export const FETCH_MENU = "FETCH_MENU";

// Users actions
export const FETCH_USERS = "FETCH_USERS";
export const FETCH_USER = "FETCH_USER";
export const CREATE_USER = "CREATE_USER";
export const DELETE_USERS = "DELETE_USERS";
export const SORT_USERS = "SORT_USERS";
export const IMPORT_USERS = "IMPORT_USERS";

// Group actions
export const FETCH_GROUPS = "FETCH_GROUPS";
export const CREATE_GROUP = "CREATE_GROUP";
export const FETCH_GROUP = "FETCH_GROUP";
export const DELETE_USERS_GROUP = "DELETE_USERS_GROUP";
export const UPDATE_GROUP = "UPDATE_GROUP";
export const GROUP_USERS = "GROUP_USERS";
export const DELETE_GROUPS = "DELETE_GROUPS";

// Alert actions
export const SHOW_ALERT = "SHOW_ALERT";
export const CLEAR_ALERTS = "CLEAR_ALERTS";
export const REQUEST_TIMEOUT = 20000;
export const HANDLE_LOADER = "HANDLE_LOADER";

// Account actions
export const FETCH_ACCOUNTS = "FETCH_ACCOUNTS";
export const FETCH_ACCOUNT = "FETCH_ACCOUNT";
export const CREATE_ACCOUNT = "CREATE_ACCOUNT";
export const DELETE_ACCOUNT = "DELETE_ACCOUNT";

// Notebook actions
export const FETCH_NOTEBOOKS_START = "FETCH_NOTEBOOKS_START";
export const FETCH_NOTEBOOKS = "FETCH_NOTEBOOKS";
export const SORT_NOTEBOOKS = "SORT_NOTEBOOKS";
export const SET_NOTEBOOK = "SET_NOTEBOOK";
export const LIST_NOTEBOOKS = "LIST_NOTEBOOKS";
export const CLEAR_NOTEBOOKS = "CLEAR_NOTEBOOKS";
export const ENCRYPT_NOTEBOOK = "ENCRYPT_NOTEBOOK";

// Notes actions
export const FETCH_NOTES = "FETCH_NOTES";
export const SORT_NOTES = "SORT_NOTES";
export const FETCH_NOTES_START = "FETCH_NOTES_START";
export const FETCH_NOTE_START = "FETCH_NOTE_START";
export const FETCH_NOTE = "FETCH_NOTE";
export const CREATE_NOTE = "CREATE_NOTE";
export const DECRYPT_NOTE = "DECRYPT_NOTE";
export const CLEAR_DECRYPTED = "CLEAR_DECRYPTED";
export const SET_FAVOURITE = "SET_FAVOURITE";
export const FETCH_FAVOURITES = "FETCH_FAVOURITES";
export const DELETE_FAVOURITES = "DELETE_FAVOURITES";
export const BATCH_CREATE_NOTES = "BATCH_CREATE_NOTES";

// Policies actions
export const FETCH_POLICIES = "FETCH_POLICIES";
export const FETCH_POLICY = "FETCH_POLICY";
export const FETCH_POLICIES_START = "FETCH_POLICIES_START";
export const FETCH_POLICY_START = "FETCH_POLICY_START";
export const CREATE_POLICY = "CREATE_POLICY";

// Tasks actions
export const FETCH_TASKS_START = "LIST_TASKS_START";
export const FETCH_TASKS = "LIST_TASKS";
export const DELETE_TASKS = "DELETE_TASKS";
export const FETCH_TASK = "FETCH_TASK";

// Certificates action
export const FETCH_CERTIFICATES_START = "FETCH_CERTIFICATES_START";
export const FETCH_CERTIFICATES = "FETCH_CERTIFICATES";
export const REQUEST_CERTIFICATES = "REQUEST_CERTIFICATES";
export const DELETE_CERTIFICATES = "DELETE_CERTIFICATES";

// Sections actions
export const FETCH_SECTIONS_START = "FETCH_SECTIONS_START";
export const FETCH_SECTIONS = "FETCH_SECTIONS";
export const LIST_SECTIONS = "LIST_SECTIONS";
export const ENCRYPT_SECTIONS = "ENCRYPT_SECTIONS";
export const SEARCH_SECTIONS = "SEARCH_SECTIONS";

// Alert types
export const TYPE_DANGER = "danger";
export const TYPE_SUCCESS = "success";
export const TYPE_WARN = "warning";

// Breadcrumb actions
export const SHOW_BREAD = "SHOW_BREAD";
export const DISPLAY_BREAD = "DISPLAY_BREAD";
export const SET_LAST_ITEM = "SET_LAST_ITEM";
export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";

// Search actions
export const SEARCH_FETCH_TAGS = "SEARCH_FETCH_TAGS";
export const SEARCH_FETCH_TAGS_START = "SEARCH_FETCH_RECIPIENTS_START";
export const SEARCH_FETCH_SEARCHES = "SEARCH_FETCH_SEARCHES";
export const SEARCH_FETCH_SEARCHES_START = "SEARCH_FETCH_SEARCHES_START";
export const SEARCH_FETCH_RECIPIENTS = "SEARCH_FETCH_RECIPIENTS";
export const SEARCH_FETCH_RECIPIENTS_START = "SEARCH_FETCH_RECIPIENTS_START";
export const SEARCH_NOTES_START = "SEARCH_NOTES_START";
export const SEARCH_NOTES = "SEARCH_NOTES";
export const SEARCH_CLEAR_ALL = "SEARCH_CLEAR_ALL";

// Global actions
export const SET_SERVICE = "SET_SERVICE";

// FUnctions
export function success(response,type){
	return {
		type: type,
		payload: response
	}
}

export function handleError(dispatch,err){
	var message = "";
	if (err.response){message = err.response.data.message;}
	else{message = err.toString();}
	dispatch(showAlert(TYPE_DANGER,message));
	dispatch(isLoading(false));
}