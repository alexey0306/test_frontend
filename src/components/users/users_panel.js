/*
	Name: UsersPanel
	Purpose: This component is used to hold the buttons and search bar for the users list
	Created: 17.10.2017
	Author: Alexey Zelenkin
*/

// Import section
import React, {Component} from 'react';
import CreateUserModal from '../modals/create_user';
import {deleteUsers,fetchUsers,sortUsers} from '../../actions/users_actions';
import {groupUsers} from '../../actions/groups_actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import GroupsDropdown from '../groups/groups_dropdown';
import SearchBar from '../common/search_bar';

// Declaring class
class UsersPanel extends Component{

	constructor(props){
		super(props);
		this.state = {lgShow: false,term:''}
		this.onDelete = this.onDelete.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSearchClick = this.onSearchClick.bind(this);
	}

	onDelete(){

		if (this.props.selected.length == 0){
			alert("Please select users to delete");
			return false;
		}

		if (window.confirm("Are you sure that you want to delete selected users?")){
			this.props.deleteUsers(this.props.selected);
		}
	}

	onSearchClick(term){
		this.props.fetchUsers(term);
	}

	onChange(event){		
		this.setState({term:event.target.value});
	}

	onGroupAdd(group_id){
		this.props.groupUsers(group_id,this.props.selected);
	}

	onGroupSort(group_id){
		this.props.fetchUsers(this.props.term,"asc",group_id);
	}
	
	render(){
		return (
			<div>
			<div className="row">
				<div className="col-md-11">
					<div className="col-md-6">
						<span>
							<button type="button" onClick={() => this.setState({lgShow:true})} className="btn btn-default" title="Create a new user">
								<i className="fa fa-plus" aria-hidden="true"></i> Create
							</button>
						</span>
						<span>
							<button type="button" onClick={this.onDelete} className="btn btn-default" title="Delete users">
								<i className="fa fa-trash" aria-hidden="true"></i> Delete
							</button>
						</span>
						<div className="inline">
							<GroupsDropdown onGroupAdd={this.onGroupAdd.bind(this)} mode="groupadd" />
							<GroupsDropdown onGroupSort={this.onGroupSort.bind(this)} mode="sort" />
						</div>

					</div>
					<div className="col-md-6">
						<SearchBar onSearch={this.onSearchClick} />
					</div>
					
				</div>
			</div><br/>
			<CreateUserModal show={this.state.lgShow} onHide={()=> this.setState({lgShow:false})}/>
			</div>
		);
	}
}


function mapDispatchToProps(dispatch){
	return bindActionCreators({deleteUsers,fetchUsers,groupUsers, sortUsers},dispatch);
}

export default connect(null,mapDispatchToProps)(UsersPanel);