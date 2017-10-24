// Import section
import React,{Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchAccount} from '../../actions/accounts_actions';

class AccountInfoModal extends Component{

	render(){

		const { handleSubmit, pristine, reset, submitting } = this.props;
		return (
			<form>
				<Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-lg">Account Info</Modal.Title>
					</Modal.Header>
					<Modal.Body className="modalBody">
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