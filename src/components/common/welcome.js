// Import section
import React, {Component} from 'react';
import {displayBread} from '../../actions/navigation_actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Init section
const items = [{id:1, name: "Getting started","link":"/",isLink: false}]

// Class section
class Welcome extends Component{

	componentDidMount(){
		this.props.displayBread(items);
	}

	render(){
		return (
			<div>Welcome message</div>			
		);
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({displayBread},dispatch);
}

export default connect(null,mapDispatchToProps)(Welcome);

