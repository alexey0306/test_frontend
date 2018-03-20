import {SHOW_ALERT,CLEAR_ALERTS, HANDLE_LOADER} from './index';

export function showAlert(type,message){
	return {
		type: SHOW_ALERT,
		payload: {
			id: (new Date()).getTime(), 
			type: type, 
			message: message, 
			headline: type.charAt(0).toUpperCase() + type.slice(1) }
	}
}

export function clearAlerts(){
	return {
		type: CLEAR_ALERTS,
		payload: null
	}
}

export function isLoading(loading){
	return {
		type: HANDLE_LOADER,
		payload: loading
	}
}