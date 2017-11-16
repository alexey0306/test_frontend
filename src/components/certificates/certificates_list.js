import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Label} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {fetchCertificates} from '../../actions/certificates_actions';
import {no_certificates_found} from '../../globals/globals';
import {Link} from 'react-router';
import _ from 'lodash';
import {selectItem,selectAll} from '../../globals/helpers';
import {ROOT_URL} from '../../actions/index';


class CertificatesList extends Component{
	constructor(props){
		super(props);
		this.state = {selected: [], sort: "dsc"}
	}

	componentDidMount(){
		this.props.fetchCertificates();
	}

	onRowClick(event){
		var checked = event.currentTarget.querySelectorAll("input[type='checkbox']")[0].checked;
		var id = parseInt(event.currentTarget.id);
		this.selectCertificate(id,!checked);
		event.stopPropagation();
	}

	onCertificateSelect(event){
		event.stopPropagation();
		this.selectCertificate(event.target.id,event.target.checked);
	}

	onAllChange(event){
		var arrayVar = selectAll(event,this.props.certificates);
		this.setState({selected:arrayVar});
		this.props.onChange(arrayVar);
	}

	selectCertificate(id,checked){
		var arrayVar = selectItem(id,checked,this.state)
		this.setState({selected: arrayVar});
		this.props.onChange(arrayVar);
	}

	downloadPFX(event){
		const URL = `${ROOT_URL}certificates/pfx/${event.target.id}`;
		window.location.href = URL;
	}

	downloadPublic(event){
		const URL = `${ROOT_URL}certificates/public/${event.target.id}`;
		window.location.href = URL;
	}

	getStatus(status){
		switch (status){
			case "2":
				return (<Label bsStyle="danger">Revoked</Label>);
			case "3":
				return (<Label bsStyle="danger">Expired</Label>);
			default:
				return (<Label bsStyle="success">Active</Label>);
		}		
	}

	renderCertificate(cert){
		return (
			<tr onClick={this.onRowClick.bind(this)} id={cert.id} key={cert.id} className="selected">
				<td><input id={cert.id} onClick={this.onCertificateSelect.bind(this)} checked={_.includes(this.state.selected,cert.id)} type="checkbox"/></td>
				<td>{cert.name}</td>
				<td><Link to={"users/"+cert.user.id}>{cert.user.name}</Link></td>
				<td>{this.getStatus(cert.status)}</td>
				<td>
					<button id={cert.id} title="Download PFX" onClick={this.downloadPFX.bind(this)} className="btn btn-default">PFX</button>
					<button id={cert.id} title="Download Public Key" onClick={this.downloadPublic.bind(this)} className="btn btn-default">Public</button>
				</td>
			</tr>
		)
	}

	render(){
		return (
			<table className="table table-hover table-striped">
					<thead>
						<tr>
							<th><input type="checkbox" onChange={this.onAllChange.bind(this)} /></th>
							<th>Name</th>
							<th>User</th>
							<th>Status</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{this.props.certificates.length == 0 ? 
							no_certificates_found : 
							this.props.certificates.map(this.renderCertificate.bind(this))}
					</tbody>
				</table>
		);
	}
}

function mapStateToProps(state){
	return { certificates: state.certificates.all };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchCertificates},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(CertificatesList);