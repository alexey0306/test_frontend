import React, {Component} from 'react';
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap';

class DecryptPanel extends Component{
	constructor(props){
		super(props);
		this.state = {recipient: null, password: ""}
		this.renderRecipient = this.renderRecipient.bind(this);
		this.selectRecipient = this.selectRecipient.bind(this);
	}

	onChange(event){
		this.setState({password: event.target.value});
	}

	selectRecipient(event){

		// Getting password from the corresponding field
		var password = event.currentTarget.querySelectorAll("input[type='password']")[0].value;
		if (password == ""){
			alert("Please specify the password in the corresponding field. This password is required to get the decryption key from PFX file");
			return;
		}

		// Decrypting note
		this.props.onDecrypt("cms",password,event.currentTarget.id);
		event.stopPropagation();
	}

	onPasswordChange(event){
		this.setState({password: event.target.value});
	}

	onClick(event){
		this.props.onDecrypt("password",this.state.password,null);
	}

	renderRecipient(recip){
		return (
			<ListGroupItem key={recip.id} id={recip.id} href="" onClick={this.selectRecipient}>
				<div className="row">
					<div className="col-md-6" style={{paddingTop:'5px'}}>
						<strong>{recip.name}</strong>
					</div>
					<div className="col-md-6">
						<span><input onClick={(event) => event.stopPropagation()} type="password" className="form-control" placeholder="Password to open PFX"/></span>
					</div>
				</div>			
				
				</ListGroupItem>
		);
	}

	render(){
		// Display the password-based panel
		if ( this.props.recipients && this.props.recipients.length == 0){
			return (
				<div className="row">
					<div className="col-md-3"></div>
					<div className="col-md-6">
						<Panel>
							This note is a password encrypted note. To view its content please type the password in the field below
							<div className="form-group">
							<div style={{marginTop:'10px'}}>
								<input onChange={this.onChange.bind(this)} value={this.state.password} type="password" className="form-control" placeholder="Type password here"/>
							</div>
							<div style={{marginTop:'10px'}} className="centered">
								<button onClick={this.onClick.bind(this)} className="btn btn-default">Decrypt</button>
							</div>
							</div>
						</Panel>
					</div>
					<div className="col-md-3"></div>
				</div>
			);
		}
		else{
			return (
				<div className="row">
					<div className="col-md-3"></div>
					<div className="col-md-6">
						<Panel>
							This note is a CMS encrypted note. To view its contents click on one of the recipients listed below
							<div style={{marginTop:'10px'}}>
								<ListGroup>
									{this.props.recipients && this.props.recipients.length != 0 ? 
										(this.props.recipients.map(this.renderRecipient))
										:
										(<ListGroupItem> -- no recipients found -- </ListGroupItem>)
									}
								</ListGroup>
							</div>
						</Panel>
					</div>
					<div className="col-md-3"></div>
				</div>
			);
		}

	}
}

export default DecryptPanel;