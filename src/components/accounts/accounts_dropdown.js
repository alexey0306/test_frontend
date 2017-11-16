import React, {Component} from 'react';

class AccountsDropdown extends Component {

	constructor(props){
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	onChange(event){
		this.props.onChange(event.target.value,event.target.options[event.target.selectedIndex].id);
	}

	renderAccount(account){
		return (
			<option id={account.service} key={account.id} value={account.id}>{account.name}</option>
		);
	}

	render(){
		return (
			<select onChange={this.onChange} className="form-control">
				<option value=""> -- Select account -- </option>
				{this.props.accounts.length != 0 ? this.props.accounts.map(this.renderAccount) : ''}
			</select>
		);
	}
}

export default AccountsDropdown;