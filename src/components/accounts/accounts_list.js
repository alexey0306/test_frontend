// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//// Importing additional components
import AccountInfoModal from '../modals/account_info';
import CreateAccountModal from '../modals/create_account';
import AccountCard from './account_card';

//// Importing additional actions
import {
	fetchAccounts,fetchAccount,deleteAccount,fetchDefault,disconnectAccount
} 
from '../../actions/accounts_actions';
import {ROOT_URL} from '../../actions/index';
import {displayBread} from '../../actions/navigation_actions';
import {SERVICE_ONENOTE} from '../../globals/globals';
import {custom_axios} from '../../globals/helpers';
import {confirmations} from '../../globals/messages';

// Initializing variables
const items = [{id:1, name: "Accounts", link: "/accounts", isLink: false}];


class AccountsList extends Component{

	constructor(props){
		super(props);
		this.state = {modalInfo: false, modalCreate: false,service: 0}
		this.onLogin = this.onLogin.bind(this);
		this.renderAccount = this.renderAccount.bind(this);
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
		if (window.confirm(confirmations.disconnect_account)){
			this.props.disconnectAccount(id);
		}
	}

	onDelete(id){
		if (window.confirm(confirmations.delete_account)){
			this.props.deleteAccount([id]);
		}
	}

	onLogin(id,service){
		const URL = `${ROOT_URL}accounts/login/${id}/${service}`;

		switch (parseInt(service)){
			case SERVICE_ONENOTE:
				custom_axios().get(URL)
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
		console.log(this.props.accounts);
		return (
			<div>
			<div className="accounts-list">
				{this.props.accounts.map(this.renderAccount)}
				<div onClick={this.onNewClick.bind(this)} className="card">
					<div className="card-block-new">
						<i className="fa fa-plus fa-big" aria-hidden="true"></i>
						<div className="card-text-new">Add new account</div>
					</div>
				</div>
			</div>
			<AccountInfoModal 
				show={this.state.modalInfo} 
				service={this.state.service} 
				onHide={()=> this.setState({modalInfo:false})}/>
			<CreateAccountModal 
				show={this.state.modalCreate} 
				onHide={()=> this.setState({modalCreate:false})}/>
			</div>
		);
	}

	renderAccount(account){
		return (
			<AccountCard 
				key={account.id} 
				account={account}
				onLogin={this.onLogin.bind(this)} 
				onLogout={this.onLogout.bind(this)} 
				onInfoClick={this.onInfoClick.bind(this)} 
				onDelete={this.onDelete.bind(this)}
			/>
		);
		
	}

	componentDidMount(){
		this.props.fetchAccounts();
		this.props.displayBread(items);
	}
}

function mapStateToProps(state){
	return { 
		accounts: state.accounts.all 
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		fetchAccounts,fetchAccount,displayBread,deleteAccount,
		fetchDefault,disconnectAccount
	},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(AccountsList);