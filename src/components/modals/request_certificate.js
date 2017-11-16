// Import section
import React,{Component} from 'react';
import {Modal,Button,Alert} from 'react-bootstrap';
import {reduxForm, Field} from 'redux-form';
import {requestCertificates} from '../../actions/certificates_actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {renderField,textAreaField} from '../../globals/render_fields';
import UsersList from '../users/users_list';


class RequestCertificateModal extends Component{

	constructor(props){
		super(props);
		this.state = {selected: [], alertVisible: false, alertText:"",password:""};
		this.request = this.request.bind(this);
	}

	componentWillReceiveProps(){
		this.setState({selected: [], alertVisible: false, alertText:"",password:""});
	}

	onUsersChange(selected){
		this.setState({selected});
	}

	handleAlertDismiss() {
    	this.setState({ alertVisible: false, password: ''});
 	}

 	onPasswordChange(event){
 		this.setState({password: event.target.value});
 	}


	request(){

		// Checking that at least one user has been selected 
		if (this.state.selected.length == 0){
			this.setState({alertVisible:true,alertText:"Please select users to request certificates to"});
			return;
		}

		// Sending request for the certificate
		this.props.requestCertificates({users:this.state.selected,password:this.state.password});
		this.props.onHide();
	}

	render(){
		const { handleSubmit, pristine, reset, submitting } = this.props;
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
							<div class="help-block">This password is needed to protect your users' P12 files (encrypted private and public keypairs). If none is specified, system will use empty password and P12 files can be opened by anyone</div>
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