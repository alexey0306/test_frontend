import openSocket from 'socket.io-client';
import React, {Component} from 'react';
import {ROOT_URL,TYPE_SUCCESS,TYPE_DANGER} from '../../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {showNotification} from '../../globals/helpers';
import {showAlert} from '../../actions/alerts_actions';

const socket = openSocket(ROOT_URL);
class SocketListener extends Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		var self = this;
		socket.on("task_finished",function(data){

			// Processing message
			console.log(data);
			let notification = JSON.parse(data);
			self.props.showAlert(notification.type,notification.message);
		});
	}

	render(){
		return (<div></div>);
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({showAlert},dispatch);
}

export default connect(null,mapDispatchToProps)(SocketListener);
