// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {DropdownButton,MenuItem} from 'react-bootstrap';

// Init section
const actions = [
	{id:1, title:"Encrypt", value: "encrypt",icon: 'lock'},
	{id:2, title:"Restore", value: "restore",icon:'refresh'}
];

// Class section
class NotesActions extends Component{
	constructor(props){
		super(props);
	}

	onActionSelect(value){
		this.props.onChange(value);
	}

	render(){
		return (
			<DropdownButton id="btnAction" onSelect={this.onActionSelect.bind(this)} title={<span><i className="fa fa-tasks" aria-hidden="true"></i> Actions</span>}>
				{actions.map(this.renderAction)}
			</DropdownButton> 
		);
	}

	renderAction(action){
		return (<MenuItem key={action.id} eventKey={action.value}><i className={`fa fa-${action.icon}`} style={{marginRight:'5px'}} aria-hidden="true"></i> {action.title}</MenuItem>); 
	}
}

export default NotesActions;