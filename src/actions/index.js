// Export section
export const ROOT_URL = "https://www.saferoomapp.com:5000/";
export const FETCH_MENU = "FETCH_MENU";

// Users actions
export const FETCH_USERS = "FETCH_USERS";
export const FETCH_USER = "FETCH_USER";
export const CREATE_USER = "CREATE_USER";
export const DELETE_USERS = "DELETE_USERS";
export const SORT_USERS = "SORT_USERS";

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
export const REQUEST_TIMEOUT = 3000;

// Account actions
export const FETCH_ACCOUNTS = "FETCH_ACCOUNTS";
export const FETCH_ACCOUNT = "FETCH_ACCOUNT";

// Alert types
export const TYPE_DANGER = "danger";
export const TYPE_SUCCESS = "success";
export const TYPE_WARN = "warning";

// Breadcrumb actions
export const SHOW_BREAD = "SHOW_BREAD";

// FUnctions
export function success(response,type){
	return {
		type: type,
		payload: response
	}
}