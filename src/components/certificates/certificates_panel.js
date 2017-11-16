/*
	Name: CertificatesPanel
	Purpose: This component is used to hold the buttons and search bar for the Certificate list
	Created: 07.11.2017
	Author: Alexey Zelenkin
*/

// Import section
import React, {Component} from 'react';
import RequestCertificateModal from '../modals/request_certificate';
import {fetchCertificates,deleteCertificates} from '../../actions/certificates_actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Declaring class
class CertificatesPanel extends Component{

	constructor(props){
		super(props);
		this.state = {lgShow: false,term:''}
		this.onDelete = this.onDelete.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSearchClick = this.onSearchClick.bind(this);
	}

	onDelete(){

		if (this.props.items.length == 0){
			alert("Please select certificates to delete");
			return false;
		}

		if (window.confirm("Are you sure that you want to delete selected certificates?")){
			this.props.deleteCertificates(this.props.items);
		}
	}

	onSearchClick(event){
		event.preventDefault();
		this.props.fetchCertificates(this.state.term);
	}

	onChange(event){
		this.setState({term:event.target.value});
	}
	
	render(){
		return (
			<div>
			<div className="row">
				<div className="col-md-11">
					<div className="col-md-3">
						<span>
							<button type="button" onClick={() => this.setState({lgShow:true})} className="btn btn-default" title="Request certificates">
								<i className="fa fa-plus" aria-hidden="true"></i> Request
							</button>
						</span>
						<span>
							<button type="button" onClick={this.onDelete} className="btn btn-default" title="Delete users">
								<i className="fa fa-trash" aria-hidden="true"></i> Delete
							</button>
						</span>						
					</div>
					<div className="col-md-9">
						<form onSubmit={this.onSearchClick}>
						<div className="input-group">
						<input type="text" onChange={this.onChange} className="form-control searchBar" placeholder="Search the certificate by name or serial"/>
							<span className="input-group-btn">					
							<button  type="submit" className="btn btn-default" title="Search">
								<i className="fa fa-search" aria-hidden="true"></i>
							</button>
							</span>
							</div>
						</form>
					</div>
					
				</div>
			</div><br/>
			<RequestCertificateModal show={this.state.lgShow} onHide={()=> this.setState({lgShow:false})}/>
			</div>
		);
	}
}


function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchCertificates,deleteCertificates},dispatch);
}

export default connect(null,mapDispatchToProps)(CertificatesPanel);