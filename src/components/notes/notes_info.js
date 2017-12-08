import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchNote,decryptNote,clearNote,restoreNotes,encryptNotes} from '../../actions/notes_actions';
import Breadcrumb from '../common/breadcrumb';
import DOMPurify from 'dompurify';
import NotesInfoPanel from './notes_info_panel';
import {Panel,ListGroup,ListGroupItem} from 'react-bootstrap';
import DecryptPanel from '../common/panel_decrypt';
import DecryptNoteModal from '../modals/decrypt_note';
import EncryptModal from '../modals/encrypt_method';
import {displayBread,setLastItem} from '../../actions/navigation_actions';
import Spinner from '../common/spinner';
import {fetchTags} from '../../actions/search_actions';


class NotesInfo extends Component{

	constructor(props){
		super(props);
		this.state = {lgShow:false,modalEncrypt: false};
		this.onDecrypt = this.onDecrypt.bind(this);
		this.generateItems = this.generateItems.bind(this);
		this.restoreNote = this.restoreNote.bind(this);
	}

	clear(){
		this.props.clearNote();
	}

	componentDidMount(){
		this.props.fetchNote(this.props.params.id, this.props.params.guid);
		this.props.clearNote();
		this.props.displayBread(this.generateItems());
		this.props.fetchTags(this.props.params.id);
	}

	componentWillUnmount(){
		this.props.setLastItem(null);
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

	restoreNote(){
		this.props.restoreNotes({
			account: this.props.params.id,
			guids: [this.props.params.guid]
		});
	}

	encryptNotes(method,password,keys){
		this.props.encryptNotes({
			account: this.props.params.id,
			guids:[this.props.params.guid],
			method: method,
			password: password,
			keys: keys
		});
	}

	render(){

		if (this.props.note.content){
			return (
				<div>
					<NotesInfoPanel 
						onRestore={() => this.restoreNote()} 
						onEncrypt={() => this.setState({modalEncrypt:true})} 
						onRefresh={() => this.props.fetchNote(this.props.params.id, this.props.params.guid)} 
						tags={this.props.tags} 
						note={this.props.note} />
					<div dangerouslySetInnerHTML={{__html: this.props.note.content}}></div>
					{this.props.note.encrypted ? <DecryptPanel backedup={this.props.note.backedup} onDecrypt={this.onDecrypt} recipients={this.props.note.recipients} /> : '' }
					<DecryptNoteModal show={this.state.lgShow} onHide={()=> this.setState({lgShow:false})}/>
					<EncryptModal onSelected={this.encryptNotes.bind(this)} show={this.state.modalEncrypt} onHide={()=> this.setState({modalEncrypt:false})} />			
				</div>
			);
		}
		else{
			return (<Spinner />);
		}
	}


	generateItems(){

		var params = this.props.params;

		// Creating the first element
		var items = [{id:1, name: "Notebooks", link:`/notebooks/${params.id}/list`,isLink:true}];

		// If section is specified
		if (params.section_name && params.section_guid){
			items.push({id:1, name:params.notebook_name,link:`/sections/${params.id}/list/${params.notebook_name}/${params.notebook_guid}`,isLink:true});
		}
		else{
			items.push({id:1, name:params.notebook_name,link:`/notes/${params.id}/list/${params.notebook_name}/${params.notebook_guid}`,isLink:true});
		}

		// If section is specified
		if (params.section_name && params.section_guid){
			items.push({
				id:4,
				name: params.section_name,
				link: `/notes/${params.id}/list/${params.notebook_name}/${params.notebook_guid}/${params.section_name}/${params.section_guid}`,
				isLink: true
			})
		}

		return items;
	}
}

function mapStateToProps(state){
	return { 
			note: state.notes.note, 
			active: state.notebooks.active,
			decrypted: state.notes.decrypted,
			tags: state.search.tags
		 };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		fetchNote,decryptNote,clearNote,
		displayBread,setLastItem,restoreNotes,
		encryptNotes,fetchTags},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NotesInfo);