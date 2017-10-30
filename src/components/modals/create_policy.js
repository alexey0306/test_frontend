// Import section
import React,{Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
import {reduxForm, Field} from 'redux-form';
import { createPolicy } from '../../actions/policies_actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {renderField,textAreaField} from '../../globals/render_fields';

// Declaring class
class CreatePolicyModal extends Component{

	constructor(props){
		super(props);
		this.state = { policies:[], accounts:[], notebooks: [] }
	}

	onSubmit(props){
		this.props.createPolicy(props);
		this.props.onHide();		
	}

	addPolicy(){
		const policy = {id:1,account:0,notebooks:[]};
		this.setState({policies: this.state.policies.concat([policy])})
	}

	renderPolicy(policy){
		return (
			<div class="panel panel-default">
				<div class="panel-body">
					<div className="form-group">
						<label>Account</label>
						<div>
							<select className="form-control">
								<option> -- All accounts -- </option>
							</select>
						</div>
					</div>
					<div className="form-group">
						<label>Notebooks</label>
						<div>
							<select className="form-control">
								<option value="*"> -- All notebooks -- </option>
							</select>
						</div>
					</div>
					<div className="form-group">
						<label>Operations</label>
						<div>
							<ul class="list-group">
								<li class="list-group-item group-hover">View notebooks/notes</li>
								<li class="list-group-item group-hover">Create new notes</li>
								<li class="list-group-item group-hover">Update existing notes</li>
							</ul>
						</div>
					</div>
					<div className="pull-right">
						<button className="btn btn-danger">Remove</button>
					</div>
				</div>
				
			</div>
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
						<button onClick={this.addPolicy.bind(this)} class="btn btn-default"><i class="fa fa-plus" aria-hidden="true"></i> Add account </button>
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

function mapStateToProps(state){
	return { accounts: state.accounts.all };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({createPolicy},dispatch);
}

CreatePolicyModal = connect(mapStateToProps, mapDispatchToProps)(CreatePolicyModal);
export default CreatePolicyModal;