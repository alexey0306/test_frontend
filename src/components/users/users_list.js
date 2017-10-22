import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUsers,sortUsers} from '../../actions/users_actions';
import {Link} from 'react-router';
import Breadcrumb from '../common/breadcrumb'
import UsersPanel from './users_panel';
import _ from 'lodash';

const no_users_found = <tr><td colspan="10" className="not_found"> [ No users found ] </td></tr>;

class UsersList extends Component{

	constructor(props){
		super(props);
		this.state = {loading: false,selected:[],sort:"dsc"};
		this.renderUser = this.renderUser.bind(this);
		this.onUserSelect = this.onUserSelect.bind(this);
		this.onRowClick = this.onRowClick.bind(this);
		this.onAllChange = this.onAllChange.bind(this);
		this.sortUsers = this.sortUsers.bind(this);
	}

	sortUsers(){
		this.props.sortUsers(this.state.sort);
		if (this.state.sort == "dsc"){this.setState({sort: "asc"});}
		else{this.setState({sort: "dsc"});}
	}

	onRowClick(event){
		var checked = event.currentTarget.querySelectorAll("input[type='checkbox']")[0].checked;
		var id = parseInt(event.currentTarget.id);
		this.selectUser(id,!checked);
		event.stopPropagation();
	}

	onUserSelect(event){
		event.stopPropagation();
		this.selectUser(event.target.id,event.target.checked);
	}

	onAllChange(event){
		var arrayVar = [];
		if (event.target.checked){
			this.props.users.map(function(user){
				arrayVar.push(user.id);
			})
		}
		this.setState({selected:arrayVar});
	}

	selectUser(id,checked){
		var arrayVar = this.state.selected;
		if (checked){
			arrayVar.push(parseInt(id));
		}
		else{
			arrayVar = arrayVar.filter(function(item){
				return item !== parseInt(id);
			});
		}
		this.setState({selected: arrayVar});
	}



	renderUser(user){

		return (
			<tr onClick={this.onRowClick} id={user.id} key={user.id} className="selected">
				<td><input id={user.id} onClick={this.onUserSelect} checked={_.includes(this.state.selected,user.id)} type="checkbox"/></td>
				<td><Link to={"users/"+user.id}>{user.name}</Link></td>
				<td>{user.email}</td>
				<td>{user.subject}</td>
			</tr>
		);
	}

	componentDidMount(){
		var self = this;
		this.props.fetchUsers();
	}

	render(){
		const items = [{name:"Users",link:"/users",isLink:false}];
		return (
				<div>
				<Breadcrumb items={items} />
				<UsersPanel selected={this.state.selected} />
				<table className="table table-hover table-striped">
					<thead>
						<tr>
							<th><input onChange={this.onAllChange} type="checkbox" id='selectAll'/></th>
							<th>Name <i class="fa fa-fw fa-sort sort" id={this.state.sort} onClick={this.sortUsers}></i></th>
							<th>Email</th>
							<th>Subject</th>
						</tr>
					</thead>
					<tbody>
						{this.props.users.length == 0 ? no_users_found : this.props.users.map(this.renderUser)}
						
					</tbody>
				</table>
				</div>
				
			);		
	}

}

function mapStateToProps(state){
	return {users: state.users.all};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchUsers,sortUsers},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(UsersList);