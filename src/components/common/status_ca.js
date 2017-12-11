// Import section
import React,{Component} from 'react';
import {connect} from 'react-redux';

// Init section

// Class section
class Status_CA extends Component{

	render(){
		return (
			<div>CA status</div>
		);
	}

}

function mapStateToProps(state){
	return { status: state.status.ca };
}

export default connect(mapStateToProps,null)(Status_CA);