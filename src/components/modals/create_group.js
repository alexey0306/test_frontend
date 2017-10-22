// Import section
import React,{Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
import {reduxForm, Field} from 'redux-form';
import { createGroup } from '../../actions/groups_actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


// Creating the Render component
const renderField = ({input,label,placeholder,type,meta: {touched, error, warning}}) => (
	<div className={`form-group ${ touched && error ? 'has-error' : '' }`}>
		<label>{label}</label>
		<div>
			<input 
				className="form-control" {...input} 
				placeholder={placeholder} 
				type={type}
			/>
			{touched && ((error && <div className="help-block">{error}</div>)) }
		</div>
	</div>
);
const textAreaField = ({input,label,placeholder,type,meta: {touched, error, warning}}) => (
	<div className={`form-group ${ touched && error ? 'has-error' : '' }`}>
		<label>{label}</label>
		<div>
			<textarea 
				className="form-control" {...input} 
				placeholder={placeholder} 
				type={type}
			></textarea>
			{touched && ((error && <div className="help-block">{error}</div>)) }
		</div>
	</div>
);


class CreateGroupModal extends Component{


	onSubmit(props){
		this.props.createGroup(props);
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
						<Field placeholder="Specify group's name" name="name" type="text" component={renderField} label="Name"></Field>
						<Field placeholder="Group's description" name="dscr" component={textAreaField} label="Description"></Field>				
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
		errors.username = "Required";
	}
	else if (values.name.length > 64) {
    	errors.username = 'Must be 64 characters or less'
  	}
	return errors;
}


CreateGroupModal = reduxForm({
		form:'CreateGroupForm',
		validate
})(CreateGroupModal);

function mapDispatchToProps(dispatch){
	return bindActionCreators({createGroup},dispatch);
}

CreateGroupModal = connect(null, mapDispatchToProps)(CreateGroupModal);
export default CreateGroupModal;