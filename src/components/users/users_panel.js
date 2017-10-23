/*
	Name: UsersPanel
	Purpose: This component is used to hold the buttons and search bar for the users list
	Created: 17.10.2017
	Author: Alexey Zelenkin
*/

// Import section
import React, {Component} from 'react';
import CreateUserModal from '../modals/create_user';
import {deleteUsers,fetchUsers} from '../../actions/users_actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import GroupsDropdown from '../groups/groups_dropdown';

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

	onSearchClick(event){
		event.preventDefault();
		this.props.fetchUsers(this.state.term);
	}

	onChange(event){		
		this.setState({term:event.target.value});
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
						<GroupsDropdown selected={this.props.selected} term={this.state.term} />						
					</div>
					<div className="col-md-6">
						<form onSubmit={this.onSearchClick}>
						<div className="input-group">
						<input type="text" onChange={this.onChange} className="form-control searchBar" placeholder="Type the user name to search"/>
							<span className="input-group-btn">					
							<button type="submit" className="btn btn-default" title="Search">
								<i className="fa fa-search" aria-hidden="true"></i>
							</button>
							</span>
							</div>
						</form>
					</div>
					
				</div>
			</div><br/>
			<CreateUserModal show={this.state.lgShow} onHide={()=> this.setState({lgShow:false})}/>
			</div>
		);
	}
}


function mapDispatchToProps(dispatch){
	return bindActionCreators({deleteUsers,fetchUsers},dispatch);
}

export default connect(null,mapDispatchToProps)(UsersPanel);