import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Alert, AlertList} from 'react-bs-notifier';
import {bindActionCreators} from 'redux';
import {clearAlerts} from '../../actions/alerts_actions';

const alerts = [{
	id: 1,
	type: "info",
	message: "Hello, world"
}, {
	id: 2,
	type: "success",
	message: "Oh, hai"
}];
const timeout = 8000;
const position = "top-right";


class Notification extends Component{

	constructor(props){
		super(props);
	}

	dismiss(){
		this.props.clearAlerts();
	}

	render(){
		return (
			<div>
				<AlertList
					position={position}
					alerts={this.props.alerts}
					timeout={timeout}
					dismissTitle="Close"
					onDismiss={this.dismiss.bind(this)}
				/>
			</div>
		);
	}
}

function mapStateToProps(state){
	return { alerts: state.alerts.all };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({clearAlerts},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Notification);