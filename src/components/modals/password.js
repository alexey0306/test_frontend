// Import section
import React,{Component} from 'react';
import {Modal} from 'react-bootstrap';

// Class declaration
class PasswordModal extends Component{
	constructor(props){
		super(props);
		this.state = {password: "",valid: true}
	}

	onChange(event){
		this.setState({password:event.target.value})
	}

	componentWillReceiveProps(){
		this.setState({password:""});
	}

	submitPassword(){
		if (this.state.password == ""){
			this.setState({valid:false});
			return;
		}
		this.props.submitPassword(this.state.password);
		this.props.onHide();
	}

	render(){
		return (
			<Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
			<Modal.Body className="modalBody bodyModal">
				<div className={`form-group ${ !this.state.valid ? 'has-error' : '' }`}>
					<label>Password</label>
					<input type="password" onChange={this.onChange.bind(this)} value={this.state.password} className="form-control" placeholder="Type the password"/>
					<div className="help-block">{this.props.description}</div>
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