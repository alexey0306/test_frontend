// Import section
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import {listNotebooks} from '../../actions/notebooks_actions';
import AccountsDropdown from '../accounts/accounts_dropdown';
import NotebooksDropdown from '../notebooks/notebooks_dropdown';
import SectionsDropdown from '../sections/sections_dropdown';
import {SERVICE_ONENOTE} from '../../globals/globals';
import {listSections} from '../../actions/sections_actions';

// Init section

// Class section
class PolicyItem extends Component{
	constructor(props){
		super(props);
		this.state = {
			service: -1, 
			account: "", 
			notebooks: [],
			notebook:{},
			sections: [],
			section:{},
			actions:[]}
		this.selectAction = this.selectAction.bind(this);
		this.updateData = this.updateData.bind(this);
	}

	selectAction(event){
		event.preventDefault();
		event.stopPropagation();
		var action = event.currentTarget.querySelectorAll("span")[0].innerHTML;
		var actions = this.state.actions;

		// Checking if action has been already selected for this policy
		if (_.includes(actions,action)){
			_.pull(actions,action);
		}
		else{
			actions.push(action)
		}
		// Updating the state
		this.setState({actions});
		
	}

	onNotebookSelect(guid,name){
		if (guid != ""){
			this.setState({notebook: {guid:guid,name:name}});
			switch (parseInt(this.state.service)){
				case SERVICE_ONENOTE:
					this.props.listSections(this.state.account,guid,this.props.index);
					break;
				default:
					break;
			}
		}		
	}

	onAccountSelect(account_id,service){
		if (account_id != ""){
			this.setState({account: account_id, service: service});
			this.props.listNotebooks(account_id,this.props.index);
		}
	}

	onSectionSelect(guid){
		
	}

	// Adding notebook to the list of affected notebooks
	addNotebook(){

		// Adding the notebook to the list of selected notebooks
		var arrayVar = this.state.notebooks.slice();
		if (!_.find(arrayVar,{guid:this.state.notebook.guid})){
			arrayVar.push(this.state.notebook);
		}

		// Updating the state
		this.setState({notebooks: arrayVar});
	}

	updateData(){
		this.props.onChange(this.props.index, this.state);
	}

	render(){
		console.log(this.state);
		return (
			<div key={this.props.index} class="panel panel-default">
				<div className="panel-heading"><h4>Policy #{this.props.index}</h4></div>
				<div className="panel-body">
					<div className="form-group">
						<label>Account</label>
						<AccountsDropdown accounts={this.props.accounts} onChange={this.onAccountSelect.bind(this)} />
					</div>
					<div className="form-group">
						<label>Notebooks</label>
						{ this.props.notebooks[this.props.index] ? 
							(
								<div className="input-group">
									<NotebooksDropdown onChange={this.onNotebookSelect.bind(this)} notebooks={this.props.notebooks[this.props.index]} />
									<span class="input-group-btn">
	    								<button onClick={this.addNotebook.bind(this)} class="btn btn-default" type="button" tabindex="-1"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
	  								</span>
								</div>
							)
							:
							(
								<select className="form-control">
									<option value=""> -- Select notebooks -- </option>
								</select>
							) 
						}
						<ul class="list-group" style={{marginTop:'10px'}}>
							{this.state.notebooks.map(function(notebook){
								return (<li className={"list-group-item"}>{notebook.name} <div className="pull-right icon"><i className={"fa fa-remove hover"} aria-hidden="true"></i></div></li>)
							})}
						</ul>

					</div>
					<div className="form-group">
						<label>Section</label>
						{ this.props.sections[this.props.index] ? 
							(
								<SectionsDropdown sections={this.props.sections[this.props.index]} onChange={this.onSectionSelect.bind(this)} service={this.state.service} />
							)
							:
							(
								<select className="form-control">
									<option value=""> -- Select section -- </option>
								</select>	
							) 
						}
					</div>
					<div className="form-group">
						<label>Operations</label>
						<div>
							<ul class="list-group">
								<li onClick={this.selectAction} name="view" className={"list-group-item group-hover " + (_.includes(this.state.actions,'view') ? 'selected-action' : '')}>View notebooks/notes <span className="hidden">view</span><div className="pull-right"><i className={"fa fa-check" + (_.includes(this.state.actions,'view') ? '' : 'hidden') } aria-hidden="true"></i></div></li>
								<li onClick={this.selectAction} name="view" className={"list-group-item group-hover " + (_.includes(this.state.actions,'create') ? 'selected-action' : '')}>Create new notes <span className="hidden">create</span><div className="pull-right"><i className={"fa fa-check" + (_.includes(this.state.actions,'create') ? '' : 'hidden') } aria-hidden="true"></i></div></li>
								<li onClick={this.selectAction} name="view" className={"list-group-item group-hover " + (_.includes(this.state.actions,'update') ? 'selected-action' : '')}>Create new notes <span className="hidden">update</span><div className="pull-right"><i className={"fa fa-check" + (_.includes(this.state.actions,'update') ? '' : 'hidden') } aria-hidden="true"></i></div></li>
							</ul>
						</div>
					</div>
					<div className="pull-right">
						<button onClick={this.removePolicy} id={this.props.index} className="btn btn-danger">Remove</button>
					</div>
				</div>
				
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		accounts: state.accounts.all,
		notebooks: state.notebooks.notebook_list,
		sections: state.sections.select
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({listNotebooks,listSections},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(PolicyItem);