import React, {Component} from 'react';
import {Radio,Checkbox} from 'react-bootstrap';
import CertificatesList from '../certificates/certificates_list.js';

const INITIAL_STATE = {keys:[], method:"password", password: ""}

class EncryptionMethod extends Component{

	constructor(props){
		super(props);
		this.state = INITIAL_STATE
		this.updateData = this.updateData.bind(this);
	}

	updateData(){
		var stateVar = this.state;
		this.props.onMethodSelect(stateVar);
	}

	selectKeys(selected){
		this.setState({keys:selected}, function(){
			this.updateData();
		});
	}

	onPasswordChange(event){
		this.setState({password:event.target.value},function(){
			this.updateData();
		});
	}
	selectMethod(event){
		this.setState({method: event.target.id},function(){
			this.updateData();
		});
	}

	render(){
		return (
			<div>
				<div>
					<Radio id="password" checked={this.state.method === "password"} onChange={this.selectMethod.bind(this)}><strong> Password encryption </strong></Radio>
					<div className={this.state.method != "password" ? 'disabledDiv' : '' } style={{paddingLeft:'20px'}}>
						<div>Note will be encrypted using password. If you want to use your master password, check the Use Master option. If you want to use One-Time password, then type this password in the <strong>Password</strong> field
						</div>
						<div class="form-group">
							<Checkbox> Use master password </Checkbox>
							<div className={this.state.method == "password" && this.state.password == "" ? 'has-error' : ''}>
								<input onChange={this.onPasswordChange.bind(this)} value={this.state.password} type="password" class="form-control" placeholder="Type your password here" />								
							</div>
						</div>
					</div><br/>

					<Radio id="cms" checked={this.state.method === "cms"} onChange={this.selectMethod.bind(this)} name="method"><strong>CMS encryption</strong></Radio>
					<div className={this.state.method != "cms" ? 'disabledDiv' : '' }>
						<div>Note will be encrypted using selected public keys. This method allows you to encrypt note for multiple users with different keys. Each Public key you select below is having the corresponding private key, that can be used to decrypt this note 
						</div>
						<div style={{marginTop:'10px'}}>
							<CertificatesList onChange={this.selectKeys.bind(this)} />
						</div>
					</div>

				</div>
			</div>
		);
	}

}

export default EncryptionMethod;