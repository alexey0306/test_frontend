/*
	Name: GroupsDropdown
	Purpose: This component is used to display a list of groups in the form of a dropdown
	Created: 17.10.2017
	Author: Alexey Zelenkin
*/

// Import section
import React, {Component} from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchGroups} from '../../actions/groups_actions';

// Class definition
class GroupsDropdown extends Component{

	constructor(props){
		super(props);
		this.renderGroup = this.renderGroup.bind(this);
	}

	componentDidMount(){
		this.props.fetchGroups();
	}

	onGroupSelect(event){
		if (window.confirm("Are you sure that you want to add users to this group?")){
			this.props.groupUsers();
		}

	}

	renderGroup(group){
		return (<MenuItem key={group.id} eventKey={group.id}>{group.name}</MenuItem>); 
	}

	render(){
		return (
			<DropdownButton onSelect={this.onGroupSelect} title="Add to group" id="dropdown-size-medium">
        		{this.props.groups.map(this.renderGroup)}
      		</DropdownButton>
		);
	}
}

function mapStateToProps(state){
	return {groups: state.groups.all};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchGroups},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(GroupsDropdown);