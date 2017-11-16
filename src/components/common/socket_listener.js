import openSocket from 'socket.io-client';
import React, {Component} from 'react';
import {ROOT_URL,TYPE_SUCCESS,TYPE_DANGER} from '../../actions/index';
import {process_message} from '../../actions/listen_socket.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {showNotification} from '../../globals/helpers';

const socket = openSocket(ROOT_URL);
class SocketListener extends Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		var self = this;
		socket.on("task_finished",function(data){
			showNotification("Message from server",data,TYPE_SUCCESS);
		});
	}

	render(){
		return (<div></div>);
	}
}

export default SocketListener;
