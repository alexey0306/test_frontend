/*
	Name: CertificatesPanel
	Purpose: This component is used to hold the buttons and search bar for the Certificate list
	Created: 07.11.2017
	Author: Alexey Zelenkin
*/

// Import section
import React, {Component} from 'react';
import RequestCertificateModal from '../modals/request_certificate';
import PasswordModal from '../modals/password';
import {fetchCertificates,deleteCertificates,requestCertificates} from '../../actions/certificates_actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import GroupsDropdown from '../groups/groups_dropdown';
import {PFX_DSCR} from '../../globals/messages';

// Declaring class
class CertificatesPanel extends Component{

	constructor(props){
		super(props);
		this.state = {lgShow: false,term:'',group:null,psShow:false}
		this.onDelete = this.onDelete.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSearchClick = this.onSearchClick.bind(this);
		this.onRequestForGroup = this.onRequestForGroup.bind(this);
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

	onRequestForGroup(group_id){
		this.setState({group: group_id,psShow: true});
	}

	GroupRequest(password){
		this.props.requestCertificates({
			users:[],
			password: password,
			group: this.state.group
		})
	}
	
	render(){
		return (
			<div>
			<div className="row">
				<div className="col-md-11">
					<div className="col-md-6">
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
						<div className="inline">
							<GroupsDropdown onGroupRequest={this.onRequestForGroup} mode="request" />
						</div>					
					</div>
					<div className="col-md-6">
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
			<PasswordModal submitPassword={this.GroupRequest.bind(this)} description={PFX_DSCR} show={this.state.psShow} onHide={()=> this.setState({psShow:false})}  />
			</div>
		);
	}
}


function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchCertificates,deleteCertificates,requestCertificates},dispatch);
}

export default connect(null,mapDispatchToProps)(CertificatesPanel);