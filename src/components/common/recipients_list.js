// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//// Importing additional components
import CertificatesDropdown from '../certificates/certificates_dropdown.js';

//// Importing actions
import {fetchCertificates} from '../../actions/certificates_actions';

// Init section
//const no_recipients_found = <div>No recipients found</div>
const styles = {
	icon:{
		marginRight: '5px'
	},
	dropdown: {
		width:'50%'
	}

}

// Class section
class RecipientsList extends Component{

	constructor(props){
		super(props);
		this.state = {recipients: []}
	}

	componentDidMount(){
		this.props.fetchCertificates();
	}

	componentWillReceiveProps(newProps){
		if (this.props.recipients != newProps.recipients){
			this.setState({recipients: newProps.recipients});
		}
	}

	render(){
		return (
			<div>
				<div className="input-group">
					<CertificatesDropdown certificates={this.props.certificates} />
					<span className="input-group-btn">
						<button className="btn btn-default" type="submit">Add</button>
					</span>
				</div><br/>
				<ul className="list-group" style={styles.dropdown}>
					{this.props.selected.map(function(item){
						return (
							<li key={item.id} className="list-group-item">
								<span style={styles.icon}><i className="fa fa-user"></i></span> {item.name}<i className="fa fa-times selected pull-right" title='Remove recipient'></i>
							</li>
						)
					})}
				</ul>
			</div>
		);
	}
}

function mapStateToProps(state){
	return { 
		certificates: state.certificates.all,
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchCertificates},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(RecipientsList);
