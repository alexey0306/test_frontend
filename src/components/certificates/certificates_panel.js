// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//// Importing additional components
import RequestCertificateModal from '../modals/request_certificate';
import PasswordModal from '../modals/password';
import GroupsDropdown from '../groups/groups_dropdown';
import SearchBar from '../common/search_bar';
import PanelAlert from '../common/panel_alert';

//// Importing additional actions
import {fetchCertificates,deleteCertificates,requestCertificates} from '../../actions/certificates_actions';
import {PFX_DSCR,confirmations,messages} from '../../globals/messages';



// Declaring class
class CertificatesPanel extends Component{

	constructor(props){
		super(props);
		this.state = {
			lgShow: false,term:'',
			group:null,psShow:false,
			alertVisible:false,alertText:''
		}
		this.onDelete = this.onDelete.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSearchClick = this.onSearchClick.bind(this);
		this.onRequestForGroup = this.onRequestForGroup.bind(this);
	}

	onDelete(){

		if (this.props.items.length == 0){
			this.setState({alertVisible:true, alertText:messages.no_certificates_selected});
			return false;
		}

		if (window.confirm(confirmations.delete_certificates)){
			this.props.deleteCertificates(this.props.items);
		}
	}

	dismissAlert(){
		this.setState({alertVisible:false})
	}

	onSearchClick(term){
		this.props.fetchCertificates(term);
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
			<PanelAlert show={this.state.alertVisible} text={this.state.alertText} onDismiss={this.dismissAlert.bind(this)} />
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
						<SearchBar onSearch={this.onSearchClick} />
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