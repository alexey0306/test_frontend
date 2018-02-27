// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

//// Importing additional components
import CertificatesDropdown from '../certificates/certificates_dropdown.js';

//// Importing actions
import {fetchCertificates} from '../../actions/certificates_actions';

// Init section
const no_recipients_found = <li className="list-group-item"><i> -- No recipients found -- </i></li>
const styles = {
	icon:{
		marginRight: '5px'
	},
	dropdown: {
		width:'100%'
	}

}

// Class section
class RecipientsList extends Component{

	constructor(props){
		super(props);
		this.state = {recipients: []}
		this.renderRecipient = this.renderRecipient.bind(this);
		this.removeRecipient = this.removeRecipient.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount(){
		this.props.fetchCertificates();
	}

	componentWillReceiveProps(newProps){
		if (this.props.recipients != newProps.recipients){
			this.setState({recipients: newProps.recipients});
		}
	}

	renderRecipient(item){
		return (
			<li key={item.id} className="list-group-item">
				<span style={styles.icon}><i className="fa fa-user"></i></span> {item.name}
					<i 
						className="fa fa-times selected pull-right"
						onClick={() => this.removeRecipient(item.id)} title='Remove recipient'>
					</i>
			</li>
		);
	}

	addRecipient(id,serial,name){
		
		// Getting the current list of recipients
		if (id != 0){
			
			// Creating recipient object
			const recipient = {id: id, serial: serial, name: name}

			// Adding object to the collection			
			if (!_.find(this.state.recipients,recipient)){
				this.setState({
				  recipients: [...this.state.recipients, recipient]
				},function(){
					this.onChange();
				})
			}
		}		
	}

	removeRecipient(id){
		
		// Creating new array
		var recipients = this.state.recipients.filter(function( obj ) {
  			return obj.id !== id;
		});
		
		// Updating the state
		this.setState({recipients},function(){
			this.onChange();
		});


	}

	onChange(){
		this.props.onChange(this.state.recipients);
	}

	render(){
		return (
			<div>
				<CertificatesDropdown onRecipientSelected={this.addRecipient.bind(this)} certificates={this.props.certificates} />
				<br/>
				<ul className="list-group" style={styles.dropdown}>
					{
						this.state.recipients.length == 0 ? no_recipients_found : this.state.recipients.map(this.renderRecipient)
					}
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
