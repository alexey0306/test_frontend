// Import section
import React,{Component} from 'react';
import {Modal,Button,Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {decryptNote} from '../../actions/notes_actions';
import Spinner from '../common/spinner';
import ContentIFrame from '../common/iframe_content';


class DecryptNoteModal extends Component{

	constructor(props){
		super(props);
		this.state = {content: "","title": "Loading ..."};
	}

	render(){
		return (
			<Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-lg">{this.props.note ? this.props.note.title : 'Loading ...'}</Modal.Title>
				</Modal.Header>
				<Modal.Body className="modalBody bodyModal">
					{this.props.note ? 
					(
						<ContentIFrame height='800px' width='100%' borderStyle='none' content={this.props.note.content} />
					) : <Spinner />}
				</Modal.Body>
				<Modal.Footer>
					<button className="btn btn-danger" onClick={this.props.onHide}>Close</button>
				</Modal.Footer>
			</Modal>	
		);
	}
}

function mapStateToProps(state){
	return {
		note: state.notes.decrypted};
	} 

function mapDispatchToProps(dispatch){
	return bindActionCreators({decryptNote},dispatch);
}

DecryptNoteModal = connect(mapStateToProps, mapDispatchToProps)(DecryptNoteModal);
export default DecryptNoteModal;