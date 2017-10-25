/*
	Name: Navigation
	Purpose: This component is used to hold the navigation menu
	Created: 15.10.2017
	Author: Alexey Zelenkin
*/

// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchMenu} from '../../actions/menu_actions';
import {fetchAccounts} from '../../actions/accounts_actions';
import {Link} from 'react-router';
import {no_accounts_found} from '../../globals/globals';

class Navigation extends Component{

	renderAccount(account){
		return (
		<Link key={account.id} to={`/notebooks/list/${account.id}`}>
			<li className="list-group-item">{account.name}</li>
		</Link>
		);
	}

	renderItem(item){
		if (item.header){
			return (
				<h4 key={item.name}>{item.name}</h4>
			);
		}
		else{
			return (
				<Link key={item.name} to={`/${item.link}`}>
					<li  className="list-group-item">{item.name}</li>
				</Link>
			);
		}
	}

	componentDidMount(){
		this.props.fetchMenu();
		this.props.fetchAccounts();	
	}

	render(){
		return (
			<div>
				<ul className="list-group">
					{this.props.items.map(this.renderItem)}
					<h4 key="Accounts">Accounts</h4>
					{ this.props.accounts.length == 0 ? 
						no_accounts_found : this.props.accounts.map(this.renderAccount)
					}
				</ul>
				
			</div>
		);
	}

}

function mapStateToProps(state){
	return {
		items: state.navigation.items,
		accounts: state.accounts.all
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchMenu,fetchAccounts},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Navigation);