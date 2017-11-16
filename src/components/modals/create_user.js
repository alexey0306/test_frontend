// Import section
import React,{Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
import {reduxForm, Field} from 'redux-form';
import { createUser } from '../../actions/users_actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {renderField} from '../../globals/render_fields';

class CreateUserModal extends Component{


	onSubmit(props){
		this.props.createUser(props);
		this.props.reset();
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
						<Field placeholder="Specify user's name" name="name" type="text" component={renderField} label="Name"></Field>
						<Field placeholder="Specify user's email" name="email" type="text" component={renderField} label="Email"></Field>
						<Field placeholder="Specify user's password" name="password" type="password" component={renderField} label="Password"></Field>
						<Field placeholder="Confirm user's password" name="passwordCnf" type="password" component={renderField} label="Confirm password"></Field>
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
    	errors.name = 'Must be 64 characters or less'
  	}
	if (!values.email) {
		errors.email = 'Required'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    	errors.email = 'Invalid email address'
  	}
	if (!values.password){
		errors.password = "Required";
	}
	if (values.password != values.passwordCnf){
		errors.password = "Passwords don't match";
	}

	return errors;
}


CreateUserModal = reduxForm({
		form:'CreateUserForm',
		validate
})(CreateUserModal);

function mapDispatchToProps(dispatch){
	return bindActionCreators({createUser},dispatch);
}

CreateUserModal = connect(null, mapDispatchToProps)(CreateUserModal);
export default CreateUserModal;