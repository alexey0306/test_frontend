// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {DropdownButton,MenuItem} from 'react-bootstrap';

// Init section
const actions = [
	{id:1, title:"Create", value: "create",icon: 'plus'},
	{id:2, title:"Delete", value: "delete",icon:'trash'},
	{id:3, title:"Import", value: "import",icon:'upload'}
];

// Class section
class UsersActions extends Component{
	constructor(props){
		super(props);
	}

	onActionSelect(value){
		this.props.onChange(value);
	}

	render(){
		return (
			<DropdownButton onSelect={this.onActionSelect.bind(this)} title={<span><i className="fa fa-tasks" aria-hidden="true"></i> Actions</span>}>
				{actions.map(this.renderAction)}
			</DropdownButton> 
		);
	}

	renderAction(action){
		return (<MenuItem key={action.id} eventKey={action.value}><i className={`fa fa-${action.icon}`} style={{marginRight:'5px'}} aria-hidden="true"></i> {action.title}</MenuItem>); 
	}
}

export default UsersActions;