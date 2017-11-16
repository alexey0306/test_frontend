/*
	Name: GroupsPanel
	Purpose: This component is used to hold the buttons and search bar for the groups list
	Created: 17.10.2017
	Author: Alexey Zelenkin
*/

// Import section
import React, {Component} from 'react';
import CreateGroupModal from '../modals/create_group';
import {fetchGroups,deleteGroups} from '../../actions/groups_actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Declaring class
class GroupsPanel extends Component{

	constructor(props){
		super(props);
		this.state = {lgShow: false,term:''}
		this.onDelete = this.onDelete.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSearchClick = this.onSearchClick.bind(this);
	}

	onDelete(){

		if (this.props.selected.length == 0){
			alert("Please select groups to delete");
			return false;
		}

		if (window.confirm("Are you sure that you want to delete selected groups?")){
			this.props.deleteGroups(this.props.selected);
		}
	}

	onSearchClick(event){
		event.preventDefault();
		this.props.fetchGroups(this.state.term);
	}

	onChange(event){
		this.setState({term:event.target.value});
	}
	
	render(){
		return (
			<div>
			<div className="row">
				<div className="col-md-11">
					<div className="col-md-3">
						<span>
							<button type="button" onClick={() => this.setState({lgShow:true})} className="btn btn-default" title="Create a new user">
								<i className="fa fa-plus" aria-hidden="true"></i> Create
							</button>
						</span>
						<span>
							<button type="button" onClick={this.onDelete} className="btn btn-default" title="Delete users">
								<i className="fa fa-trash" aria-hidden="true"></i> Delete
							</button>
						</span>						
					</div>
					<div className="col-md-9">
						<form onSubmit={this.onSearchClick}>
						<div className="input-group">
						<input type="text" onChange={this.onChange} className="form-control searchBar" placeholder="Search the group by name"/>
							<span className="input-group-btn">					
							<button  type="submit" className="btn btn-default" title="Search">
								<i className="fa fa-search" aria-hidden="true"></i>
							</button>
							</span>
							</div>
						</form>
					</div>
					
				</div>
			</div><br/>
			<CreateGroupModal show={this.state.lgShow} onHide={()=> this.setState({lgShow:false})}/>
			</div>
		);
	}
}


function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchGroups,deleteGroups},dispatch);
}

export default connect(null,mapDispatchToProps)(GroupsPanel);