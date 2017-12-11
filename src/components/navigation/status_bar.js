// Import section
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Init section
const styles = {
	width:'100%',
	height:'150px',
	backgroundColor: '#394165',
	color: "#fff",
	paddingLeft: '16px',
	paddingTop:'20px'
}

// Class section
class StatusBar extends Component{
	render(){
		return (
			<div style={styles}>
				<div>
					<i className="fa fa-user-o fa-2x profile"></i>
				</div>
				<div style={{marginTop:'10px'}}>{this.props.admin.name}</div>
				<div style={{color: '#ccc'}}>{this.props.admin.email}</div>
			</div>
		);
	}
}

function mapStateToProps(state){
	return { admin: state.admin.admin };
}

export default connect(mapStateToProps,null)(StatusBar);