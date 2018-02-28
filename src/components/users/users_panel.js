// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//// Importing additional components
import CreateUserModal from '../modals/create_user';
import GroupsDropdown from '../groups/groups_dropdown';
import SearchBar from '../common/search_bar';
import ImportUsersModal from '../modals/import_users';
import PanelAlert from '../common/panel_alert';
import UsersActions from './users_actions';

//// Importing additional actions
import {deleteUsers,fetchUsers,sortUsers} from '../../actions/users_actions';
import {groupUsers} from '../../actions/groups_actions';
import {confirmations,messages} from '../../globals/messages';



// Declaring class
class UsersPanel extends Component{

	constructor(props){
		super(props);
		this.state = {
			lgShow: false,
			term:'',importModal:false, 
			alertVisible:false,alertText:""
		}
		this.onDelete = this.onDelete.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSearchClick = this.onSearchClick.bind(this);
	}

	onDelete(){

		// Checking that at least user was selected
		if (this.props.selected.length == 0){
			this.setState({alertVisible:true,alertText:messages.no_users_selected});
			return false;
		}

		// Confirmation
		if (window.confirm(confirmations.delete_users)){
			this.props.deleteUsers(this.props.selected);
		}
	}

	onSearchClick(term){
		this.props.fetchUsers(term);
	}

	onChange(event){		
		this.setState({term:event.target.value});
	}

	dismissAlert(){
		this.setState({alertVisible:false});
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
		// Checking that at least user was selected
		if (this.props.selected.length == 0){
			this.setState({alertVisible:true,alertText:messages.no_users_selected});
			return false;
		}
		this.props.groupUsers(group_id,this.props.selected);
	}

	onGroupSort(group_id){
		this.props.fetchUsers(this.props.term,"asc",group_id);
	}
	
	render(){
		return (
			<div>
			<PanelAlert onDismiss={this.dismissAlert.bind(this)} show={this.state.alertVisible} text={this.state.alertText} />
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