// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import {fetchGroups} from '../../actions/groups_actions';

// Initializing variables
const DISPLAY_MODES = {groupadd: "groupadd", request: "request", sort: "sort"}

// Class declaration
class GroupsDropdown extends Component{
	constructor(props){
		super(props);
	}

	renderGroup(group){
		return (<MenuItem key={group.id} eventKey={group.id}>{group.name}</MenuItem>); 
	}

	componentDidMount(){
		this.props.fetchGroups();
	}

	onGroupAdd(group_id){
		if (window.confirm("Are you sure that you want to add users to this group?")){
			this.props.onGroupAdd(group_id)
		}
	}

	onGroupSort(group_id){
		this.props.onGroupSort(group_id);
	}

	onGroupRequest(group_id){
		this.props.onGroupRequest(group_id);
	}

	render(){

		switch (this.props.mode){
			case DISPLAY_MODES.groupadd:
				return (
					<DropdownButton onSelect={this.onGroupAdd.bind(this)} 
					title={<span><i className="fa fa-users" aria-hidden="true"></i> Add to group</span>} id="dropdown-size-medium">
						{this.props.groups.map(this.renderGroup)}
					</DropdownButton>
				);
			case DISPLAY_MODES.sort:
				return (
					<DropdownButton onSelect={this.onGroupSort.bind(this)} title={<span><i className="fa fa-filter" aria-hidden="true"></i> Filter by</span>} id="dropdown-size-medium">
						<MenuItem key="" eventKey=""> -- No groups -- </MenuItem>
						{this.props.groups.map(this.renderGroup)}
					</DropdownButton>
				);

			case DISPLAY_MODES.request:
				return (
					<DropdownButton onSelect={this.onGroupRequest.bind(this)} 
					title={<span><i className="fa fa-users" aria-hidden="true"></i> Request for group</span>} id="dropdown-size-medium">
						{this.props.groups.map(this.renderGroup)}
					</DropdownButton>
				);

		}

		
	}
}

function mapStateToProps(state,ownProps){
	return {
		groups: state.groups.all,
		selected: ownProps.selected
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchGroups},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(GroupsDropdown);
