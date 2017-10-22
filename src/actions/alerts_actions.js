import {SHOW_ALERT,CLEAR_ALERTS} from './index';

export function showAlert(type,message){
	return {
		type: SHOW_ALERT,
		payload: {id:1, type: type, message: message}
	}
}

export function clearAlerts(){
	return {
		type: CLEAR_ALERTS,
		payload: null
	}
}