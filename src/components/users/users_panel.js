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
import UsersActions from './users_actions';
import ImportUsersModal from '../modals/import_users'; 

// Declaring class
class UsersPanel extends Component{

	constructor(props){
		super(props);
		this.state = {lgShow: false,term:'',importModal:false}
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

	onActionSelect(action){
		switch (action){
			case "create":
				this.setState({lgShow:true});
				break;
			case "delete":
				this.onDelete();
				break;
			case "import":
				this.setState({importModal:true});
				break;

		}
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
						<UsersActions onChange={this.onActionSelect.bind(this)} />
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
			<ImportUsersModal show={this.state.importModal} onHide={()=> this.setState({importModal:false})}/>
			</div>
		);
	}
}


function mapDispatchToProps(dispatch){
	return bindActionCreators({deleteUsers,fetchUsers,groupUsers, sortUsers},dispatch);
}

export default connect(null,mapDispatchToProps)(UsersPanel);