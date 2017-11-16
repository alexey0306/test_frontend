import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchNote,decryptNote,clearNote} from '../../actions/notes_actions';
import Breadcrumb from '../common/breadcrumb';
import DOMPurify from 'dompurify';
import NotesInfoPanel from './notes_info_panel';
import {Panel,ListGroup,ListGroupItem} from 'react-bootstrap';
import DecryptPanel from '../common/panel_decrypt';
import DecryptNoteModal from '../modals/decrypt_note';
import {displayBread} from '../../actions/navigation_actions';
import Spinner from '../common/spinner';


class NotesInfo extends Component{

	constructor(props){
		super(props);
		this.state = {lgShow:false};
		this.onDecrypt = this.onDecrypt.bind(this);
	}

	clear(){
		this.props.clearNote();
	}

	componentDidMount(){
		this.props.fetchNote(this.props.params.id, this.props.params.guid);
		this.props.clearNote();

		// Creating navigation
		const items = [
			{
				id:1, 
				name: "Notebooks", 
				link:`/notebooks/list/${this.props.params.id}`,
				isLink: true
			},
			{
				id:2, 
				name: this.props.params.name, 
				link:`/notes/${this.props.params.id}/list/${this.props.params.notebook}/${this.props.params.name}`,
				isLink:true
			}
		]

		this.props.displayBread(items);
	}

	onDecrypt(mode, password=null, recipient=null){
		const data = {
			account_id: this.props.params.id,
			guid: this.props.params.guid,
			method: mode,
			psw: password,
			recipient: recipient
		}
		this.props.clearNote();
		this.setState({lgShow:true});		
		this.props.decryptNote(data);
	}

	render(){

		if (this.props.note.content){
			return (
				<div>
					<div dangerouslySetInnerHTML={{__html: this.props.note.content}}></div>
					{this.props.note.encrypted ? <DecryptPanel onDecrypt={this.onDecrypt} recipients={this.props.note.recipients} /> : '' }
					<DecryptNoteModal show={this.state.lgShow} onHide={()=> this.setState({lgShow:false})}/>			
				</div>
			);
		}
		else{
			return (<Spinner />);
		}
	}
}

function mapStateToProps(state){
	return { 
			note: state.notes.note, 
			active: state.notebooks.active,
			decrypted: state.notes.decrypted
		 };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchNote,decryptNote,clearNote,displayBread},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NotesInfo);