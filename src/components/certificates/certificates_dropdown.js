// Import section
import React,{Component} from 'react';

// Init section

// Class section
class CertificatesDropdown extends Component{

	constructor(props){
		super(props);
		this.state = {id: 0, name: "", serial: ""}
	}


	renderCertificate(certificate){
		return (
			<option id={certificate.serial} key={certificate.id} value={certificate.id}>{certificate.name}</option>
		);
	}

	onChange(event){

		// Getting currently selected recipient
		this.setState({
			id: parseInt(event.target.value),
			serial: event.target.options[event.target.selectedIndex].id,
			name: event.target.options[event.target.selectedIndex].text 
		})		
	}

	addRecipient(){
		this.props.onRecipientSelected(this.state.id, this.state.serial, this.state.name);
	}

	render(){
		return (
			<div className="input-group">
				<select onChange={this.onChange.bind(this)} className="form-control">
					<option value="0" id=""> -- Select recipient -- </option>
					{this.props.certificates.length != 0 ? this.props.certificates.map(this.renderCertificate) : ''}
				</select>
				<span className="input-group-btn">
					<button className="btn btn-default" onClick={this.addRecipient.bind(this)} type="submit">Add</button>
				</span>
			</div>
		);
	}

}

export default CertificatesDropdown;