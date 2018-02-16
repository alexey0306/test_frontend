// Import section
import React,{Component} from 'react';

// Init section

// Class section
class CertificatesDropdown extends Component{


	renderCertificate(certificate){
		return (
			<option id={certificate.serial} key={certificate.id} value={certificate.id}>{certificate.name}</option>
		);
	}

	onChange(event){
		this.props.onChange(
			event.target.value,
			event.target.options[event.target.selectedIndex].id,
			event.target.options[event.target.selectedIndex].id);
	}

	render(){
		return (
			<select onChange={this.onChange} className="form-control">
				<option value="*"> -- Select recipient -- </option>
				{this.props.certificates.length != 0 ? this.props.certificates.map(this.renderCertificate) : ''}
			</select>
		);
	}

}

export default CertificatesDropdown;