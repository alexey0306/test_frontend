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
import {fetchGroups,groupUsers} from '../../actions/groups_actions';
import {fetchUsers} from '../../actions/users_actions';

// Class definition
class GroupsDropdown extends Component{

	constructor(props){
		super(props);
		this.renderGroup = this.renderGroup.bind(this);
		this.onGroupSort = this.onGroupSort.bind(this);
		this.onGroupSelect = this.onGroupSelect.bind(this);

	}

	componentDidMount(){
		this.props.fetchGroups();
	}

	onGroupSort(group_id){
		this.props.fetchUsers(this.props.term,"asc",group_id);
	}

	onGroupSelect(group_id){
		if (window.confirm("Are you sure that you want to add users to this group?")){
			this.props.groupUsers(group_id,this.props.selected);
		}

	}

	renderGroup(group){
		return (<MenuItem key={group.id} eventKey={group.id}>{group.name}</MenuItem>); 
	}

	render(){
		return (
			<div className="inline">
			<DropdownButton onSelect={this.onGroupSelect} title="Add to group" id="dropdown-size-medium">
        		{this.props.groups.map(this.renderGroup)}
      		</DropdownButton>
      		<DropdownButton onSelect={this.onGroupSort} title="Filter by" id="dropdown-size-medium">
      			<MenuItem key="" eventKey=""> -- No groups -- </MenuItem>
        		{this.props.groups.map(this.renderGroup)}
      		</DropdownButton>
      		</div>   		
		);
	}
}

function mapStateToProps(state,ownProps){
	console.log(ownProps)
	return {
		groups: state.groups.all,
		selected: ownProps.selected
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchGroups,fetchUsers,groupUsers},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(GroupsDropdown);