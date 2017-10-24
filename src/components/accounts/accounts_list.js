import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchAccounts} from '../../actions/accounts_actions';
import {no_accounts_found, get_account} from '../../globals/globals';
import Breadcrumb from '../common/breadcrumb';
import {ROOT_URL} from '../../actions/index';
import AccountInfoModal from '../modals/account_info';


class AccountsList extends Component{

	constructor(props){
		super(props);
		this.state = {lgShow: false}
		this.onLogin = this.onLogin.bind(this);
		this.renderAccount = this.renderAccount.bind(this);
		this.onLogout = this.onLogout.bind(this);
		this.onInfoClick = this.onInfoClick.bind(this);
	}

	onInfoClick(event){
		this.setState({lgShow:true});
	}

	onLogout(event){
		return "";
	}

	onLogin(event){
		const URL = `${ROOT_URL}accounts/login/${event.target.id}/${event.target.name}`;
		window.open(URL,"_blank","width=600,height=600");
	}

	render(){
		const items = [{id:1, name: "Accounts", link: "/accounts", isLink: false}];
		return (
			<div>
			<Breadcrumb items={items} />
			<div className="accounts-list">
				{this.props.accounts.map(this.renderAccount)}
				<div className="card">
					<div className="card-block-new">
						<i className="fa fa-plus fa-big" aria-hidden="true"></i>
						<div className="card-text-new">Add new account</div>
					</div>
				</div>
			</div>
			<AccountInfoModal show={this.state.lgShow} onHide={()=> this.setState({lgShow:false})}/>
			</div>
		);
	}

	renderAccount(account){
		return (
			<div key={account.id} className="card">
				<div 
					className="cardHeader" 
					style={{backgroundColor: get_account(account.service)}}>
				</div>
				<div className="card-block">
					<h3 className="card-title">{account.name}</h3>
					<p className="card-text">{account.dscr}</p>
					{ !account.loggedIn ? (
						<a id={account.id} name={account.service} onClick={this.onLogin} className="btn btn-primary">Login</a>
					) :
					(
						<a id={account.id} name={account.service} onClick={this.onLogout} className="btn btn-primary">Logout</a>
					)
					 }
					<a id={account.id} name={account.service} onClick={this.onInfoClick} className="btn btn-primary">Info</a>
					
				</div>
				<div className="card-footer">
					Created: {account.created}
				</div>
			</div>
		);
	}

	componentDidMount(){
		this.props.fetchAccounts();
	}
}

function mapStateToProps(state){
	return { accounts: state.accounts.all };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchAccounts},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(AccountsList);