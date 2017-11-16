// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchPolicies} from '../../actions/policies_actions';
import {no_policies_found} from '../../globals/globals';
import Breadcrumb from '../common/breadcrumb';
import {Link} from 'react-router';
import PoliciesPanel from './policies_panel';
import _ from 'lodash';
import {displayBread} from '../../actions/navigation_actions';

// Initializing variables
const items = [{id:1, name: "Policies","link":"/users",isLink: false}]

// Declaring class
class PoliciesList extends Component{

	constructor(props){
		super(props);
		this.state = {selected:[],sort:"dsc"};
		this.onPolicySelect = this.onPolicySelect.bind(this);
		this.renderPolicy = this.renderPolicy.bind(this);
		this.onRowClick = this.onRowClick.bind(this);
		this.onAllChange = this.onAllChange.bind(this);
	}

	componentDidMount(){
		this.props.fetchPolicies();
		this.props.displayBread(items);		
	}

	onRowClick(event){
		var checked = event.currentTarget.querySelectorAll("input[type='checkbox']")[0].checked;
		var id = parseInt(event.currentTarget.id);
		this.selectPolicy(id,!checked);
		event.stopPropagation();
	}

	onPolicySelect(event){
		event.stopPropagation();
		this.selectPolicy(event.target.id,event.target.checked);
	}

	onAllChange(event){
		var arrayVar = [];
		if (event.target.checked){
			this.props.policies.map(function(policy){
				arrayVar.push(policy.id);
			})
		}
		this.setState({selected:arrayVar});
	}

	selectPolicy(id,checked){
		var arrayVar = this.state.selected;
		if (checked){
			arrayVar.push(parseInt(id));
		}
		else{
			arrayVar = arrayVar.filter(function(item){
				return item !== parseInt(id);
			});
		}
		this.setState({selected: arrayVar});
	}

	renderPolicy(policy){
		const link = `policies/${policy.id}`;
		return (
			<tr onClick={this.onRowClick} id={policy.id} key={policy.id} className="selected">
				<td><input id={policy.id} onClick={this.onPolicySelect} checked={_.includes(this.state.selected,policy.id)} type="checkbox"/></td>
				<td><Link to={link}>{policy.name}</Link></td>
				<td>{policy.dscr}</td>
			</tr>
		);
	}

	render(){
		return (
			<div>
			<PoliciesPanel />
			<table className="table table-hover table-striped">
				<thead>
					<tr>
						<th><input onChange={this.onAllChange} id="selectAll" type="checkbox"/></th>
						<th>Name</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					{this.props.policies.length == 0 ? no_policies_found : this.props.policies.map(this.renderPolicy)}
				</tbody>
			</table>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {policies: state.policies.all};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchPolicies,displayBread},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(PoliciesList);