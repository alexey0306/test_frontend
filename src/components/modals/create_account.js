// Import section
import React,{Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
import {reduxForm, Field} from 'redux-form';
import { createAccount } from '../../actions/accounts_actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {renderField,textAreaField} from '../../globals/render_fields';
import DropdownServices from '../common/dropdown_services';

class CreateAccountModal extends Component{


	onSubmit(props){
		this.props.createAccount(props);
		this.props.onHide();		
	}



	render(){

		const { handleSubmit, pristine, reset, submitting } = this.props;
		return (
			<form>
				<Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-lg">Create new user</Modal.Title>
					</Modal.Header>
					<Modal.Body className="modalBody">
						<Field placeholder="Account's name" name="name" type="text" component={renderField} label="Name"></Field>
						<Field placeholder="Account's email" name="email" type="text" component={renderField} label="Email"></Field>
						<Field placeholder="Account's description" name="dscr" type="text" component={textAreaField} label="Description"></Field>
						<DropdownServices />						
					</Modal.Body>
					<Modal.Footer>
						<button disabled={submitting} type="submit" onClick={handleSubmit(this.onSubmit.bind(this))} className="btn btn-primary">Apply</button>
						<button className="btn btn-danger" onClick={this.props.onHide}>Close</button>
					</Modal.Footer>
				</Modal>
				</form>			
		);
	}
}


function validate(values){
	const errors = {};

	if (!values.name){
		errors.name = "Required";
	}
	else if (values.name.length > 64) {
    	errors.username = 'Must be 64 characters or less'
  	}
  	if (!values.email) {
		errors.email = 'Required'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    	errors.email = 'Invalid email address'
  	}
  	if (!values.dscr){
		errors.dscr = "Required";
	}
	if (!values.service){
		errors.service = "Required";
	}
	return errors;
}


CreateAccountModal = reduxForm({
		form:'CreateAccountForm',
		validate,

})(CreateAccountModal);

function mapDispatchToProps(dispatch){
	return bindActionCreators({createAccount},dispatch);
}

CreateAccountModal = connect(null, mapDispatchToProps)(CreateAccountModal);
export default CreateAccountModal;