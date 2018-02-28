import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UsersPanel from './users_panel';
import UsersList from './users_list';
import {displayBread} from '../../actions/navigation_actions';

const items = [{id:1, name: "Users","link":"/users",isLink: false}]

class UsersIndex extends Component{

	constructor(props){
		super(props);
		this.state = {selected:[]};
		this.onUsersChange = this.onUsersChange.bind(this);
	}

	componentDidMount(){
		this.props.displayBread(items);
	}

	onUsersChange(selected){
		this.setState({selected});
	}

	render(){
		
		return (
				<div>
				<UsersPanel selected={this.state.selected} />
				<UsersList onChange={this.onUsersChange} />
				</div>				
			);		
	}

}

function mapDispatchToProps(dispatch){
	return bindActionCreators({displayBread},dispatch);
}

export default connect(null,mapDispatchToProps)(UsersIndex);