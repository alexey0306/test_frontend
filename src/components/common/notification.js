import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Alert, AlertList} from 'react-bs-notifier';
import {bindActionCreators} from 'redux';
import {clearAlerts} from '../../actions/alerts_actions';

const timeout = 10000;
const position = "bottom-right";

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