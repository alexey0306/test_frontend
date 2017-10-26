/*
	Name: NotesFilter
	Purpose: This component is used to display a list of filters for the list of notes
	Created: 17.10.2017
	Author: Alexey Zelenkin
*/

// Import section
import React, {Component} from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchNotes} from '../../actions/notes_actions';

// Class definition
class NotesFilter extends Component{

	constructor(props){
		super(props);
		this.onNotesFilter = this.onNotesFilter.bind(this);
	}

	onNotesFilter(group_id){
		//this.props.fetchUsers(this.props.term,"asc",group_id);
	}

	render(){
		return (
			<div className="inline">
      		<DropdownButton onSelect={this.onNotesFilter} title="Filter by" id="dropdown-size-medium">
      			<MenuItem key="" eventKey=""> -- All -- </MenuItem>
      			<MenuItem key="" eventKey=""> Only encrypted </MenuItem>
      			<MenuItem key="" eventKey=""> Only plain </MenuItem>
      		</DropdownButton>
      		</div>   		
		);
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchNotes},dispatch);
}

export default connect(null,mapDispatchToProps)(NotesFilter);