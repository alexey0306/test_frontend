// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Breadcrumb from '../common/breadcrumb';
import {fetchCertificates} from '../../actions/certificates_actions';
import {no_certificates_found} from '../../globals/globals';
import CertificatesPanel from './certificates_panel';
import CertificatesList from './certificates_list';
import {displayBread} from '../../actions/navigation_actions';
import _ from 'lodash';

// Initializing variables
const items = [{name:"Certificates",link:"/certificates",isLink:false}];


// Declaring class
class CertificatesIndex extends Component{

	constructor(props){
		super(props);
		this.state = {selected: []}
	}

	componentDidMount(){
		this.props.displayBread(items);
	}

	onListChanged(selected){
		this.setState({selected});
	}

	render(){
		
		return (
			<div>
				<CertificatesPanel items={this.state.selected} />
				<CertificatesList onChange={this.onListChanged.bind(this)} />
			</div>
		)
	};
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({displayBread},dispatch);
}

export default connect(null,mapDispatchToProps)(CertificatesIndex);

