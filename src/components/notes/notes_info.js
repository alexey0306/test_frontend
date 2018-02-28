// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//// Import custom components
import DecryptPanel from '../common/panel_decrypt';
import Spinner from '../common/spinner';
import ContentIFrame from '../common/iframe_content';
import NotesInfoPanel from './notes_info_panel';

//// Importing modal window components
import DecryptNoteModal from '../modals/decrypt_note';
import EncryptModal from '../modals/encrypt_method';

//// Import actions
import {fetchNote,decryptNote,clearNote,restoreNotes,encryptNotes} from '../../actions/notes_actions';
import {displayBread,setLastItem} from '../../actions/navigation_actions';
import {fetchTags} from '../../actions/search_actions';
import {custom_axios} from '../../globals/helpers';
import {ROOT_URL} from '../../actions/index';


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

	editNote(){

		// Constructing URL
		const URL = `${ROOT_URL}notes/`;
		var newContent = this.props.decrypted.content.replace(/\r?\n|\r/gm, '');

		// Preparing data
		const data = {};
		data.guid = this.props.params.guid;
		data.notebook_guid = this.props.params.notebook_guid;
		data.notebook_name = this.props.params.notebook_name;
		data.section_guid = ( this.props.params.section_guid ? this.props.params.section_guid : "" );
		data.section_name = ( this.props.params.section_name ? this.props.params.section_name : "" );
		data.account = this.props.params.id;
		data.content = newContent.replace(/<style>.*?<\/style>/g, '').replace(/<link[^>]*><\/link>/g,'').trim();
		data.title = this.props.note.name;
		data.recipients = this.props.note.recipients;
		data.service = this.props.decrypted.service;

		// Sending a request to server to temporarily store the edited note
		custom_axios().post(`${URL}save`, data)
		.then((response) => {
			this.props.router.push(`${URL}${this.props.params.id}/edit/${response.data}`);
		})
		.catch((err) => {
			alert(err);
		});
		

	}

	render(){
		// Defining the content panel
		var contentPanel = null;
		if (this.props.note.encrypted){
			contentPanel = <div><ContentIFrame width='100%' height='300px' borderStyle='none' content={this.props.note.content} /><DecryptPanel backedup={this.props.note.backedup} onDecrypt={this.onDecrypt} recipients={this.props.note.recipients} /></div>;
		}
		else{
			contentPanel = <ContentIFrame width='100%' height='800px' borderStyle='none' content={this.props.note.content} />;
		}

		if (this.props.note.content){
			return (
				<div>
					<NotesInfoPanel 
						onRestore={() => this.restoreNote()} 
						onEncrypt={() => this.setState({modalEncrypt:true})} 
						onRefresh={() => this.props.fetchNote(this.props.params.id, this.props.params.guid)} 
						tags={this.props.tags} 
						note={this.props.note} />
					{contentPanel}
					<DecryptNoteModal onEdit={this.editNote.bind(this)} show={this.state.lgShow} onHide={()=> this.setState({lgShow:false})}/>
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