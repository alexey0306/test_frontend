import React, {Component} from 'react';
import {PREMIUM_STATUS, PRIVILEGE_LEVEL} from '../../globals/globals';

class AccountInfo extends Component{

	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				<ul className="list-group">
					<li className="list-group-item"><strong>Name:</strong> {this.props.account.name}</li>
					<li className="list-group-item"><strong>Description:</strong> {this.props.account.dscr}</li>
					<li className="list-group-item"><strong>Created:</strong> {this.props.account.created}</li>
					<li className="list-group-item"><strong>Status: </strong> 
						{this.props.account.loggedIn == true ? 
							(<span className="label label-success label-status">Active</span>) : 
							(<span className="label label-warning label-status">Not active (login required)</span>)
						}
					</li>
					<li className="list-group-item"><strong>Access level: </strong>
						{!this.props.account.online.privilegeLevel ? 'n/a' : PRIVILEGE_LEVEL[this.props.account.online.privilegeLevel]}						
					</li>
					<li className="list-group-item"><strong>Premium status: </strong>
						{!this.props.account.online.premiumStatus ? 'n/a' : PREMIUM_STATUS[this.props.account.online.premiumStatus]}						
					</li>

				</ul>
			</div>
		);
	}

}

export default AccountInfo;