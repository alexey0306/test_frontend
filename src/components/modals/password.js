// Import section
import React,{Component} from 'react';
import {Modal} from 'react-bootstrap';

//// Importing additional components
import PanelAlert from '../common/panel_alert';
import {messages} from '../../globals/messages';

// Class declaration
class PasswordModal extends Component{
	constructor(props){
		super(props);
		this.state = {password: "",confPassword: "",alertVisible: false,alertText: ""}
	}

	onChange(event){
		this.setState({password:event.target.value})
	}
	onConfChange(event){
		this.setState({confPassword:event.target.value})	
	}
	dismissAlert(){
		this.setState({alertVisible:false});
	}
	componentWillReceiveProps(){
		this.setState({password:"",confPassword:""});
	}

	submitPassword(){

		// Resetting
		this.setState({alertVisible: false});

		// Checking that password is not empty
		if (this.state.password == ""){
			this.setState({alertVisible:true,alertText:messages.no_password});
			return;
		}

		// Checking that passwords match
		if ( this.state.password != this.state.confPassword ){
			this.setState({alertVisible:true,alertText: messages.passwords_mismatch});
			return;	
		}

		this.props.submitPassword(this.state.password);
		this.props.onHide();
	}

	render(){
		return (
			<Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
			<Modal.Body className="modalBody bodyModal">
				<PanelAlert onDismiss={this.dismissAlert.bind(this)} show={this.state.alertVisible} text={this.state.alertText} />
				<div>{this.props.description}</div><br/>
				<div className={`form-group ${ this.state.password == "" ? 'has-error' : '' }`}>
					<label>Password</label>
					<input type="password" onChange={this.onChange.bind(this)} value={this.state.password} className="form-control" placeholder="Type the password"/>					
				</div>
				<div className={`form-group ${ (this.state.password != this.state.confPassword) ? 'has-error' : '' }`}>
					<label>Confirm password</label>
					<input type="password" onChange={this.onConfChange.bind(this)} value={this.state.confPassword} className="form-control" placeholder="Confirm your password"/>					
				</div>
			</Modal.Body>
			<Modal.Footer>
				<button type="button" onClick={this.submitPassword.bind(this)} className="btn btn-primary">Apply</button>
				<button className="btn btn-danger" onClick={this.props.onHide}>Close</button>
			</Modal.Footer>
			</Modal>
		);
	}
}

export default PasswordModal;