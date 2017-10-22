// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field} from 'redux-form';
import {bindActionCreators} from 'redux';
import {fetchGroup} from '../../actions/groups_actions';
import _ from 'lodash';
import {Link} from 'react-router';
import Breadcrumb from '../common/breadcrumb';

class GroupInfo extends Component {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		this.props.fetchGroup(this.props.params.id);
	}

	render(){
		return (
			<div></div>
		);
	}
}

function mapStateToProps(state){
	return { group: state.groups.group };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchGroup},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(GroupInfo);