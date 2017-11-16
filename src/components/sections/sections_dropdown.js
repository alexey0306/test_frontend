import React, {Component} from 'react';
import {SERVICE_EVERNOTE,SERVICE_ONENOTE} from '../../globals/globals';

class SectionsDropdown extends Component {

	constructor(props){
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	onChange(event){
		this.props.onChange(event.target.value);
	}

	renderSection(section){
		return (
			<option key={section.guid} value={section.guid}>{section.name}</option>
		);
	}

	render(){

		if (this.props.service == SERVICE_ONENOTE ){
			return (
				<select onChange={this.onChange} className="form-control">
					<option value=""> -- Select section -- </option>
					{this.props.sections.length != 0 ? this.props.sections.map(this.renderSection) : ''}
				</select>
			);
		}
		else{
			return (
			<select disabled="true" onChange={this.onChange} className="form-control">
				<option value=""> -- Not available -- </option>
			</select>
			);
		}

		
	}
}

export default SectionsDropdown;