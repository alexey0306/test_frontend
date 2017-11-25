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
import {no_accounts_found,SERVICE_EVERNOTE,SERVICE_ONENOTE} from '../../globals/globals';
import StatusBar from './status_bar';

// Init section
const styles = {
  content: {
  	padding:'0',
  	margin:'0',
  	width:'300px',
    height: '100%',
    backgroundColor: 'white',
    overflowY: 'auto' // hide vertical
  },
  drawerSubheader:{
  	color: '#999',
  	paddingLeft: '16px',
  	paddingTop: '10px',
  	paddingBottom:'10px'
  },
  drawerItem: {
  	color: '#000000 54%',
  	padding:'10px 0px 10px 16px'
  },
  link:{
  	color: "#000"
  },
  icon:{
  	marginRight:'24px'
  }
  

};

class Navigation extends Component{

	renderAccount(account){

		var icon = "";
		switch (parseInt(account.service)){
			case SERVICE_EVERNOTE:
				icon = <img src='/images/evernote_icon_16.png'/>;
				break;
			case SERVICE_ONENOTE:
				icon = <img src='/images/onenote_icon_16.png'/>;
				break;
		}

		return (
		<div style={styles.drawerItem}>
		<span style={styles.icon}>{icon}</span>
		<Link style={styles.link} key={account.id} to={`/notebooks/${account.id}/list`}>{account.name}
		</Link>
		</div>
		);
	}

	renderItem(item){

		// Drawing separator
		if (item.separator){
			return (<div className="separator"></div>);
		}

		if (item.header){
			return (
				<div style={styles.drawerSubheader} key={item.key}>{item.name}</div>
			);
		}
		else{
			return (
				<div style={styles.drawerItem}>
				<span style={styles.icon}><i class={`fa fa-${item.icon}`} aria-hidden="true"></i></span>
				<Link key={item.name} style={styles.link} to={`/${item.link}`}>{item.name}</Link>
				</div>
			);
		}
	}

	componentDidMount(){
		this.props.fetchMenu();
		this.props.fetchAccounts();	
	}

	render(){
		return (
			<div style={styles.content}>
				<StatusBar />
				<ul className="list-group">
					{this.props.items.map(this.renderItem)}
					<div style={styles.drawerSubheader}>ACCOUNTS</div>
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