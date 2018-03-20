import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Modal,Button, Alert} from 'react-bootstrap';
import EncryptionMethod from '../common/encryption_method';

//// Importing additional components
import {messages} from '../../globals/messages';


// Declaring a class
class EncryptModal extends Component{
	
	constructor(props){
		super(props);
		this.state = {method: "password", password: "", keys: [], alertVisible:false, alertText: ''}
	}

	selectMethod(data){
		this.setState({method:data.method,password: data.password,keys:data.keys, confirmPassword: data.confirmPassword});		
	}

	handleAlertDismiss() {
    	this.setState({ alertVisible: false});
 	}

	onFinish(){

		// Hiding the alert
		this.setState({ alertVisible: false});

		// Double-checking password
		if (this.state.method == "password"){

			// Checking if password is specified
			if (this.state.password == ""){
				this.setState({alertVisible:true, alertText: messages.password_mandatory});
				return false;
			}

			// Checking that passwords match
			if (this.state.password != this.state.confirmPassword){
				this.setState({alertVisible:true, alertText: messages.passwords_mismatch});
				return false;
			}
		}

		// Checking recipients
		if ( this.state.method == "cms" && this.state.keys.length == 0 ){
			this.setState({alertVisible:true,alertText:messages.no_recipients});
			return false;
		}	

		// Sending data back to parent component
		this.props.onSelected(this.state.method,this.state.password,this.state.keys);
		this.props.onHide();		
	}

	render(){
		return (
			<Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-lg">Encryption method</Modal.Title>
				</Modal.Header>
				<Modal.Body className="modalBody bodyModal">
					{this.state.alertVisible ? (
							<Alert bsStyle="danger" onDismiss={this.handleAlertDismiss.bind(this)}>
							<p>{this.state.alertText}</p>
							</Alert>
					) : ''}
					<EncryptionMethod on onMethodSelect={this.selectMethod.bind(this)} />
				</Modal.Body>
				<Modal.Footer>
					<button type="submit" onClick={this.onFinish.bind(this)} className="btn btn-primary">Apply</button>
					<button className="btn btn-danger" onClick={this.props.onHide}>Close</button>
				</Modal.Footer>
			</Modal>
		);
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({},dispatch);
}

EncryptModal = connect(null, mapDispatchToProps)(EncryptModal);
export default EncryptModal;