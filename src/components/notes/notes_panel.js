/*
	Name: NotesPanel
	Purpose: This component is used to hold the buttons and search bar for the Notes list
	Created: 17.10.2017
	Author: Alexey Zelenkin
*/

// Import section
import React, {Component} from 'react';
import CreateUserModal from '../modals/create_user';
import {fetchNotes} from '../../actions/notes_actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import NotesFilter from './notes_filter';

// Declaring class
class NotesPanel extends Component{

	constructor(props){
		super(props);
		this.state = {term:''}
		this.onChange = this.onChange.bind(this);
		this.onSearchClick = this.onSearchClick.bind(this);
		this.onRefresh = this.onRefresh.bind(this);
	}

	onRefresh(){
		this.props.fetchNotes(this.props.notebook_id,true,this.state.term);
	}

	
	onSearchClick(event){
		event.preventDefault();
		this.props.fetchNotebooks(this.props.id, this.props.guid, false,this.state.term);
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
							<button type="button" className="btn btn-default" onClick={this.onRefresh} title="Refresh a list of notebooks">
								<i className="fa fa-refresh" aria-hidden="true"></i> Refresh
							</button>
						</span>
						<span>
							<button type="button" onClick={this.onDelete} className="btn btn-default" title="Encrypt selected notebooks">
								<i className="fa fa-lock" aria-hidden="true"></i> Encrypt
							</button>
						</span>
						<span>
							<button type="button" onClick={this.onDelete} className="btn btn-default" title="Restore selected notes">
								<i className="fa fa-lock" aria-hidden="true"></i> Restore
							</button>
						</span>
						<span>
							<button type="button" onClick={this.onDelete} className="btn btn-default" title="Restore selected notes">
								<i className="fa fa-lock" aria-hidden="true"></i> Reencrypt
							</button>
						</span>
						<NotesFilter />
					</div>
					<div className="col-md-6">
						<form onSubmit={this.onSearchClick}>
						<div className="input-group">
						<input type="text" onChange={this.onChange} className="form-control searchBar" placeholder="Type name to search"/>
							<span className="input-group-btn">					
							<button type="submit" className="btn btn-default" title="Search">
								<i className="fa fa-search" aria-hidden="true"></i>
							</button>
							</span>
							</div>
						</form>
					</div>
					
				</div>
			</div><br/>
			</div>
		);
	}
}


function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchNotes},dispatch);
}

export default connect(null,mapDispatchToProps)(NotesPanel);