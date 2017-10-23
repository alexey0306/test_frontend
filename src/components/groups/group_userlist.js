import React, {Component} from 'react';
import {no_users_found} from '../../globals/globals';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteUsers} from '../../actions/groups_actions';

class GroupUserList extends Component{

	constructor(props){
		super(props);
		this.renderUser = this.renderUser.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onDeleteAll = this.onDeleteAll.bind(this);
	}

	onDeleteAll(event){
		if (window.confirm("Are you sure that you want to delete all users from the group?")){
			// Sending the request
			event.preventDefault();
			this.props.deleteUsers(this.props.group_id,[]);
			
		}
	}

	onDelete(event){

		if (window.confirm("Are you sure that you want to delete this user from the group?")){

			// Filtering array
			var users = this.props.users.filter(function(item){
				return item.id !== parseInt(event.target.id);
			}).map(function(item){
				return item.id;
			});

			// Sending the request
			this.props.deleteUsers(this.props.group_id,users);
		}


	}

	renderUser(user){
		return (
			<tr key={user.id}>
				<td>{user.name}</td>
				<td>{user.email}</td>
				<td>{user.subject}</td>
				<td><i id={user.id} onClick={this.onDelete} className="fa fa-times sort" title="Remove user from the group" aria-hidden="true"></i></td>
			</tr>
		);
	}

	render(){
		return (
			<div>
				<table className="table table-hover table-striped">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Subject</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{this.props.users.length == 0 ? no_users_found : this.props.users.map(this.renderUser)}
					</tbody>
				</table>
				<div>
					{ this.props.users.length != 0 ? 
						(
							<button onClick={this.onDeleteAll} className="btn btn-danger">Remove all</button>
						): 
						(<div></div>)
					}
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({deleteUsers},dispatch);
}

export default connect(null,mapDispatchToProps)(GroupUserList);