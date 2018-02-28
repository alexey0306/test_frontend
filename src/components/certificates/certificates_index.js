// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CertificatesPanel from './certificates_panel';
import CertificatesList from './certificates_list';
import {displayBread} from '../../actions/navigation_actions';

// Initializing variables
const items = [{id:1,name:"Certificates",link:"/certificates",isLink:false}];


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

