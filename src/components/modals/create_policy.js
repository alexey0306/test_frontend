// Import section
import React,{Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
import {reduxForm, Field} from 'redux-form';
import { createPolicy } from '../../actions/policies_actions';
import {listNotebooks} from '../../actions/notebooks_actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {renderField,textAreaField} from '../../globals/render_fields';
import _ from 'lodash';
import PolicyItem from '../policies/policy_item';
import AccountsDropdown from '../accounts/accounts_dropdown';


// Declaring class
class CreatePolicyModal extends Component{

	constructor(props){
		super(props);
		this.state = { policies:[], accounts:[], notebooks: [] }
		this.renderPolicy = this.renderPolicy.bind(this);
		this.removePolicy = this.removePolicy.bind(this);
	}

	// Method used to remove the policy from the list of account policies
	removePolicy(event){
		var policies = this.state.policies;
		//this.setState({policies: policies});
		policies.splice(event.target.id,1);
		this.setState({policies:policies});		
	}	

	onSubmit(props){
		this.props.createPolicy(props);
		this.props.onHide();		
	}

	addPolicy(){
		const policy = {};
		this.setState({policies: this.state.policies.concat([policy])})
	}

	onPolicyChanged(policy_id,state){
		var arrayVar = this.state.policies.slice();
		arrayVar[policy_id] = this.state;
		console.log(arrayVar);
	}

	renderPolicy(policy,index){
		return (
			<PolicyItem onChange={this.onPolicyChanged.bind(this)} index={index} />
		);
	}

	render(){
		const { handleSubmit, pristine, reset, submitting } = this.props;
		return (
			<form>
				<Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-lg">Create new policy</Modal.Title>
					</Modal.Header>
					<Modal.Body className="modalBody">
						<Field placeholder="Policy's name" name="name" type="text" component={renderField} label="Name"></Field>
						<Field placeholder="Policy's description" name="dscr" component={textAreaField} label="Description"></Field>
						<button onClick={this.addPolicy.bind(this)} className="btn btn-default"><i class="fa fa-plus" aria-hidden="true"></i> Add account policy </button>
						<div className="policies">
							{this.state.policies.map(this.renderPolicy)}
						</div>
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


CreatePolicyModal = reduxForm({
		form:'CreatePolicyForm',
		validate
})(CreatePolicyModal);

function mapDispatchToProps(dispatch){
	return bindActionCreators({createPolicy,listNotebooks},dispatch);
}

CreatePolicyModal = connect(null, mapDispatchToProps)(CreatePolicyModal);
export default CreatePolicyModal;