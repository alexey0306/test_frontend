import React,{Component} from 'react';
import {Field} from 'redux-form';
import {SUPPORTED_SERVICES} from '../../globals/globals';
import {renderSelectField} from '../../globals/render_fields';


export default class DropdownServices extends Component{

	renderService(service){
		return (
			<option value={service.id}>{service.name}</option>
		);

	}

	render(){
		return (
			<Field component={renderSelectField} label="Service" name="service" className="form-control">
					<option value=""> -- Select service -- </option>
					{SUPPORTED_SERVICES.map(this.renderService)}
			</Field>			
		);
	}
}