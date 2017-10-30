import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchPolicy} from '../../actions/policies_actions';

class PolicyInfo extends Component{
	render(){
		return (
			<div>Policy # {this.props.params.id}</div>
		);
	}
}

function mapStateToProps(state){
	return {policy: state.policies.policy};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchPolicy},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(PolicyInfo);