// Import section
import React,{Component} from 'react';
import {Modal,Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//// Importing additional components
import UsersList from '../users/users_list';

//// Importing additional actions
import {requestCertificates} from '../../actions/certificates_actions';
import {messages} from '../../globals/messages';

class RequestCertificateModal extends Component{

	constructor(props){
		super(props);
		this.state = {selected: [], alertVisible: false, alertText:"",password:"",confPassword:""};
		this.request = this.request.bind(this);
	}

	componentWillReceiveProps(){
		this.setState({selected: [], alertVisible: false, alertText:"",password:"",confPassword:""});
	}

	onUsersChange(selected){
		this.setState({selected});
	}

	handleAlertDismiss() {
    	this.setState({ alertVisible: false, password: ''});
 	}

 	onConfChange(event){
 		this.setState({confPassword: event.target.value});
 	}

 	onPasswordChange(event){
 		this.setState({password: event.target.value});
 	}


	request(){

		// Resetting
		this.setState({alertVisible: false});

		// Checking that at least one user has been selected 
		if (this.state.selected.length == 0){
			this.setState({alertVisible:true,alertText:messages.no_users_selected});
			return;
		}

		// Checking that passwords match
		if (this.state.password != this.state.confPassword){
			this.setState({alertVisible:true,alertText:messages.passwords_mismatch});
			return;
		}

		// Sending request for the certificate
		this.props.requestCertificates({users:this.state.selected,password:this.state.password});
		this.props.onHide();
	}

	render(){
		return (
			<form>
				<Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-lg">Request certificates</Modal.Title>
					</Modal.Header>
					<Modal.Body className="modalBody bodyModal">
						{this.state.alertVisible ? (
							<Alert bsStyle="danger" onDismiss={this.handleAlertDismiss.bind(this)}>
							<p>{this.state.alertText}</p>
							</Alert>
						) : ''}
						
						<UsersList onChange={this.onUsersChange.bind(this)} />
						<div className="form-group">
							<label>PFX password</label>
							<input type="password" onChange={this.onPasswordChange.bind(this)} value={this.state.password} className="form-control" placeholder="Type the password to protect PFX files"/>
							
						</div>
						<div className="form-group">
							<label>Confirm password</label>
							<input type="password" onChange={this.onConfChange.bind(this)} value={this.state.confPassword} className="form-control" placeholder="Confirm your password"/>
							<div className="help-block">This password is needed to protect your users' P12 files (encrypted private and public keypairs). If none is specified, system will use empty password and P12 files can be opened by anyone</div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<button type="button" onClick={this.request.bind(this)} className="btn btn-primary">Request</button>
						<button className="btn btn-danger" onClick={this.props.onHide}>Close</button>
					</Modal.Footer>
				</Modal>
				</form>			
		);
	}
}


function mapDispatchToProps(dispatch){
	return bindActionCreators({requestCertificates},dispatch);
}

RequestCertificateModal = connect(null, mapDispatchToProps)(RequestCertificateModal);
export default RequestCertificateModal;