/*
	Name: PoliciesPanel
	Purpose: This component is used to hold the buttons and search bar for the policies list
	Created: 17.10.2017
	Author: Alexey Zelenkin
*/

// Import section
import React, {Component} from 'react';
import CreatePolicyModal from '../modals/create_policy';
import {fetchPolicies} from '../../actions/policies_actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SearchBar from '../common/search_bar';

// Declaring class
class PoliciesPanel extends Component{

	constructor(props){
		super(props);
		this.state = {lgShow: false,term:''}
		this.onDelete = this.onDelete.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSearchClick = this.onSearchClick.bind(this);
	}

	onDelete(){

		if (this.props.selected.length == 0){
			alert("Please select policies to delete");
			return false;
		}

		if (window.confirm("Are you sure that you want to delete selected policies?")){
			this.props.deleteUsers(this.props.selected);
		}
	}

	onSearchClick(term){
		this.props.fetchPolicies(term);
	}

	onChange(event){		
		this.setState({term:event.target.value});
	}
	
	render(){
		return (
			<div>
			<div className="row">
				<div className="col-md-11">
					<div className="col-md-6">
						<span>
							<button type="button" onClick={() => this.setState({lgShow:true})} className="btn btn-default" title="Create new policy">
								<i className="fa fa-plus" aria-hidden="true"></i> Create
							</button>
						</span>
						<span>
							<button type="button" onClick={this.onDelete} className="btn btn-default" title="Delete policies">
								<i className="fa fa-trash" aria-hidden="true"></i> Delete
							</button>
						</span>						
					</div>
					<div className="col-md-6">
						<SearchBar onSearch={this.onSearchClick} />
					</div>
					
				</div>
			</div><br/>
			<CreatePolicyModal show={this.state.lgShow} onHide={()=> this.setState({lgShow:false})}/>
			</div>
		);
	}
}


function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchPolicies},dispatch);
}

export default connect(null,mapDispatchToProps)(PoliciesPanel);