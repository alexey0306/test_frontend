// Import section
import React,{Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchAccount} from '../../actions/accounts_actions';
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
						{ !this.props.account.name ? 
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

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchAccount},dispatch);
}

function mapStateToProps(state){
	return { account: state.accounts.account };
}

export default connect(mapStateToProps,mapDispatchToProps)(AccountInfoModal);