// Import section
import React,{Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import Spinner from '../common/spinner';
import AccountInfo from '../accounts/account_info';

class AccountInfoModal extends Component{

	render(){
		const { handleSubmit, pristine, reset, submitting } = this.props;
		return (
			<form>
				<Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
					<Modal.Header closeButton className={`service_`+this.props.service}>
						<Modal.Title id="contained-modal-title-lg">Account Info</Modal.Title>
					</Modal.Header>
					<Modal.Body className="modalBody">
						{ !this.props.account ? 
							(<Spinner />) : 
							(<AccountInfo account={this.props.account} />) 
						}
					</Modal.Body>
					<Modal.Footer>						
						<button className="btn btn-danger" onClick={this.props.onHide}>Close</button>
					</Modal.Footer>
				</Modal>
				</form>			
		);
	}
}

function mapStateToProps(state){
	return { account: state.accounts.account, defaultNotebook: state.accounts.defaultNotebook };
}

export default connect(mapStateToProps,null)(AccountInfoModal);