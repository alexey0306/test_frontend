// Import section
import React, {Component} from 'react';
import {displayBread} from '../../actions/navigation_actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Panel} from 'react-bootstrap';
import Status_CA from './status_ca';

// Init section
const items = [{id:1, name: "Getting started","link":"/",isLink: false}]

// Class section
class Welcome extends Component{

	componentDidMount(){
		this.props.displayBread(items);
	}

	render(){
		return (
			<div className="row">
				<div className="col-md-4">
					<Status_CA />
				</div>
				<div className="col-md-4">
					<Panel header="Message Queue">
						<div>asdasdasd</div>
					</Panel>
				</div>
				<div className="col-md-4">
					<Panel header="asdasdasdasd">
						<div>asdasdasd</div>
					</Panel>
				</div>
			</div>			
		);
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({displayBread},dispatch);
}

export default connect(null,mapDispatchToProps)(Welcome);

