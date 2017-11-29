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
		this.state = {display: 0};
	}

	onNotesFilter(display){
		this.setState({display: display});
		this.props.fetchNotes(
			this.props.id, 
			this.props.guid, 
			true,this.props.search,"notebooks",display);
	}

	render(){
		return (
			<div className="inline">
      		<DropdownButton onSelect={this.onNotesFilter} title={<span><i className="fa fa-filter" aria-hidden="true"></i> Filter by</span>} id="dropdown-size-medium">
      			<MenuItem key="0" eventKey="0"> 
      			{this.state.display == 0 ? (<i className="fa fa-check iconMargin" aria-hidden="true"></i>) : ''}
      			 -- All -- </MenuItem>
      			<MenuItem key="1" eventKey="1">
      			{this.state.display == 1 ? (<i className="fa fa-check iconMargin" aria-hidden="true"></i>) : ''} 
      			 Only encrypted </MenuItem>
      			<MenuItem key="2" eventKey="2"> 
      			{this.state.display == 2 ? (<i className="fa fa-check iconMargin" aria-hidden="true"></i>) : ''}
      			 Only plain </MenuItem>
      		</DropdownButton>
      		</div>   		
		);
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchNotes},dispatch);
}

export default connect(null,mapDispatchToProps)(NotesFilter);