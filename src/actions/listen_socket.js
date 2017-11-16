import openSocket from 'socket.io-client';
import {ROOT_URL,TYPE_SUCCESS} from './index';
import {showNotification} from '../globals/helpers';
const socket = openSocket(ROOT_URL);

function process_message(){
	socket.on("task_finished",function(data){
		showNotification("Message from server", data, TYPE_SUCCESS);
	})
}


export {process_message}
