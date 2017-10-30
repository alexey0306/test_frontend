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


// Declaring class
class CreatePolicyModal extends Component{

	constructor(props){
		super(props);
		this.state = { policies:[], accounts:[], notebooks: [] }
		this.renderPolicy = this.renderPolicy.bind(this);
		this.onAccountSelect = this.onAccountSelect.bind(this);
		this.selectAction = this.selectAction.bind(this);
		this.removePolicy = this.removePolicy.bind(this);
	}

	// Method used to remove the policy from the list of account policies
	removePolicy(event){
		var policies = this.state.policies;
		//this.setState({policies: policies});
		policies.splice(event.target.id,1);

		this.setState({policies:policies});
		
	}

	selectAction(event){
		event.preventDefault();
		event.stopPropagation();
		var policies = this.state.policies;
		var policy = policies[event.target.id];
		var action = event.currentTarget.querySelectorAll("span")[0].innerHTML;
		
		// Checking if action has been already selected for this policy
		if (_.includes(policy.actions,action)){
			_.pull(policy.actions,action);
		}
		else{
			policy.actions.push(action)
		}
		// Updating the state
		this.setState({policies: policies});
		
	}

	// Event is triggered when we switch 
	onAccountSelect(event){
		this.props.listNotebooks(event.target.value,event.target.id);
	}

	onSubmit(props){
		this.props.createPolicy(props);
		this.props.onHide();		
	}

	addPolicy(){
		const policy = {account:0,notebooks:[],actions:[]};
		this.setState({policies: this.state.policies.concat([policy])})
	}

	renderPolicy(policy,index){
		return (
			<div key={index} class="panel panel-default">
				<div className="panel-heading"><h4>Policy #{index}</h4></div>
				<div className="panel-body">
					<div className="form-group">
						<label>Account</label>
						<div>
							<select id={index} onChange={this.onAccountSelect} className="form-control">
								<option value=""> -- All accounts -- </option>
								{this.props.accounts.map(function(account){
									return <option key={account.id} value={account.id}>{account.name}</option>
								})}
							</select>
						</div>
					</div>
					<div className="form-group">
						<label>Notebooks</label>
						<div>
							<select onChange={this.onNotebookSelect} id={index} className="form-control">
								<option value="*"> -- All notebooks -- </option>
								{ this.props.notebooks[index] ? this.props.notebooks[index].data.map(function(notebook){
									return <option value={notebook.guid}>{notebook.name}</option>
								}) : ''}
																
							</select>
						</div>
					</div>
					<div className="form-group">
						<label>Operations</label>
						<div>
							<ul class="list-group">
								<li onClick={this.selectAction} id={index} name="view" className={"list-group-item group-hover " + (_.includes(this.state.policies[index].actions,'view') ? 'selected' : '')}>View notebooks/notes <span className="hidden">view</span><div className="pull-right"><i className={"fa fa-check" + (_.includes(this.state.policies[index].actions,'view') ? '' : 'hidden') } aria-hidden="true"></i></div></li>
								<li onClick={this.selectAction} id={index} name="view" className={"list-group-item group-hover " + (_.includes(this.state.policies[index].actions,'create') ? 'selected' : '')}>Create new notes <span className="hidden">create</span><div className="pull-right"><i className={"fa fa-check" + (_.includes(this.state.policies[index].actions,'create') ? '' : 'hidden') } aria-hidden="true"></i></div></li>
								<li onClick={this.selectAction} id={index} name="view" className={"list-group-item group-hover " + (_.includes(this.state.policies[index].actions,'update') ? 'selected' : '')}>Create new notes <span className="hidden">update</span><div className="pull-right"><i className={"fa fa-check" + (_.includes(this.state.policies[index].actions,'update') ? '' : 'hidden') } aria-hidden="true"></i></div></li>
							</ul>
						</div>
					</div>
					<div className="pull-right">
						<button onClick={this.removePolicy} id={index} className="btn btn-danger">Remove</button>
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

function mapStateToProps(state){
	return { 
		accounts: state.accounts.all,
		notebooks: state.notebooks.notebook_list 
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({createPolicy,listNotebooks},dispatch);
}

CreatePolicyModal = connect(mapStateToProps, mapDispatchToProps)(CreatePolicyModal);
export default CreatePolicyModal;