// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import {fetchAccounts,fetchAccount,deleteAccount} from '../../actions/accounts_actions';
import {no_accounts_found} from '../../globals/globals';
import {get_account} from '../../globals/helpers';
import Breadcrumb from '../common/breadcrumb';
import {ROOT_URL} from '../../actions/index';
import AccountInfoModal from '../modals/account_info';
import CreateAccountModal from '../modals/create_account';
import {displayBread} from '../../actions/navigation_actions';
import {SERVICE_ONENOTE,SERVICE_EVERNOTE} from '../../globals/globals';

// Initializing variables
const items = [{id:1, name: "Accounts", link: "/accounts", isLink: false}];


class AccountsList extends Component{

	constructor(props){
		super(props);
		this.state = {modalInfo: false, modalCreate: false,service: 0}
		this.onLogin = this.onLogin.bind(this);
		this.renderAccount = this.renderAccount.bind(this);
		this.onLogout = this.onLogout.bind(this);
		this.onInfoClick = this.onInfoClick.bind(this);
		this.onNewClick = this.onNewClick.bind(this);
		this.deleteAccount = this.deleteAccount.bind(this);
	}

	onInfoClick(id,service){
		this.props.fetchAccount(id,service);
		this.setState({modalInfo:true});
		this.setState({service: service});
	}

	onNewClick(event){
		this.setState({modalCreate:true});
	}

	onLogout(id,service){
		return "";
	}

	deleteAccount(id){
		if (window.confirm("Are you sure that you want to delete this account?")){
			this.props.deleteAccount([id]);
		}
	}

	onLogin(id,service){
		const URL = `${ROOT_URL}accounts/login/${id}/${service}`;

		switch (parseInt(service)){
			case SERVICE_ONENOTE:
				axios.get(URL)
					.then((response) => {
						window.open(response.data,"_blank","width=600,height=400");
					})
				break;
			default:
				window.open(URL,"_blank","width=600,height=400");
				break;
		}	
	}

	render(){
		return (
			<div>
			<div className="accounts-list">
				{this.props.accounts.map(this.renderAccount)}
				<div onClick={this.onNewClick} className="card">
					<div className="card-block-new">
						<i className="fa fa-plus fa-big" aria-hidden="true"></i>
						<div className="card-text-new">Add new account</div>
					</div>
				</div>
			</div>
			<AccountInfoModal show={this.state.modalInfo} service={this.state.service} onHide={()=> this.setState({modalInfo:false})}/>
			<CreateAccountModal show={this.state.modalCreate} onHide={()=> this.setState({modalCreate:false})}/>
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
						<a onClick={() => this.onLogin(account.id,account.service) } className="btn btn-primary">Login</a>
					) :
					(
						<a onClick={() => this.onLogout(account.id,account.service)} className="btn btn-primary">Logout</a>
					)
					 }
					<a onClick={() => this.onInfoClick(account.id,account.service)} className="btn btn-primary">Info</a>
					
				</div>
				<div className="card-footer">
					Created: {account.created}
					<div className="pull-right"><i title="Delete account" onClick={() => this.deleteAccount(account.id)} class="fa fa-trash" aria-hidden="true"></i></div>
				</div>
			</div>
		);
	}

	componentDidMount(){
		this.props.fetchAccounts();
		this.props.displayBread(items);
	}
}

function mapStateToProps(state){
	return { accounts: state.accounts.all };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchAccounts,fetchAccount,displayBread,deleteAccount},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(AccountsList);