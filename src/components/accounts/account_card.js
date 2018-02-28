// Import section
import React,{Component} from 'react';
import {get_account} from '../../globals/helpers';

// Init section

// Class section
class AccountCard extends Component{

	// Triggered when Login button is clicked
	onLogin(){
		this.props.onLogin(this.props.account.id,this.props.account.service);
	}

	// Triggered when Logout button is clicked
	onLogout(){
		this.props.onLogout(this.props.account.id,this.props.account.service);
	}

	// Triggered when Info button is clicked
	onInfoClick(){
		this.props.onInfoClick(this.props.account.id, this.props.account.service);
	}

	// Triggered when Delete button is clicked
	onDelete(){
		this.props.onDelete(this.props.account.id);
	}

	render(){
		return (
			<div key={this.props.account.id} className="card">
				<div 
					className="cardHeader" 
					style={{backgroundColor: get_account(this.props.account.service)}}>
				</div>
				<div className="card-block">
					<h3 className="card-title">{this.props.account.name}</h3>
					<p className="card-text">{this.props.account.dscr}</p>
					{ !this.props.account.loggedIn ? (
						<a onClick={this.onLogin.bind(this)} className="btn btn-primary">Login</a>
					) :
					(
						<a onClick={this.onLogout.bind(this)} className="btn btn-primary">Logout</a>
					)
					 }
					<a onClick={this.onInfoClick.bind(this)} className="btn btn-primary">Info</a>
					
				</div>
				<div className="card-footer">
					Created: {this.props.account.created}
					<div className="pull-right">
							<i title="Delete account" onClick={this.onDelete.bind(this)} class="fa fa-trash" aria-hidden="true"></i>
						</div>
				</div>
			</div>
		);
	}
}

export default AccountCard;