// Import section
import React,{Component} from 'react';
import {Modal} from 'react-bootstrap';
import { importUsers } from '../../actions/users_actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class ImportUsersModal extends Component{

	constructor(props){
		super(props);
		this.state = {jsonValid: true, json:'[\n\t{"name":"Bob Smith","email":"bob.smith@example.com", "password":"password"},\n\t{"name":"John Smith","email":"john.smith@example.com", "password":"password"}\n]'};
	}


	onSubmit(props){
		this.props.importUsers(props);
		this.props.onHide();		
	}

	onImport(){
		
		if (this.state.jsonValid){
			// Sending request to import users
			this.props.importUsers(JSON.parse(this.state.json));
			this.props.onHide();
		}

	}

	onChange(event){

		var json = event.target.value;
		try{JSON.parse(json);this.setState({jsonValid:true});}
		catch(e){this.setState({jsonValid:false});}
		this.setState({json: event.target.value});
	}

	render(){

		return (
			<form>
				<Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-lg">Import users</Modal.Title>
					</Modal.Header>
					<Modal.Body className="modalBody">
						<div className={`form-group ${ !this.state.jsonValid ? 'has-error' : '' }`} >
							<label>JSON</label>
							<textarea className="form-control" onChange={this.onChange.bind(this)} rows="20">{this.state.json}</textarea>
							{ this.state.jsonValid ? ('') : (<div className="help-block">Valid JSON is required</div>) }
						</div>		
					</Modal.Body>
					<Modal.Footer>
						<button type="button" onClick={this.onImport.bind(this)} className="btn btn-primary">Apply</button>
						<button className="btn btn-danger" onClick={this.props.onHide}>Close</button>
					</Modal.Footer>
				</Modal>
				</form>			
		);
	}
}


function mapDispatchToProps(dispatch){
	return bindActionCreators({importUsers},dispatch);
}

ImportUsersModal = connect(null, mapDispatchToProps)(ImportUsersModal);
export default ImportUsersModal;

