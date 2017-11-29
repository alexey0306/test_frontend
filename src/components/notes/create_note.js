// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import NoteEditor from './notes_editor';
import Breadcrumb from '../common/breadcrumb';
import {fetchNotebooks,clearNotebooks} from '../../actions/notebooks_actions';
import {fetchSections} from '../../actions/sections_actions';
import AccountsDropdown from '../accounts/accounts_dropdown';
import NotebooksDropdown from '../notebooks/notebooks_dropdown';
import SectionsDropdown from '../sections/sections_dropdown';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css'; // If using WebPack and style-loader
import {SERVICE_ONENOTE} from '../../globals/globals';
import EncryptModal from '../modals/encrypt_method';
import {displayBread} from '../../actions/navigation_actions';
import {createNote} from '../../actions/notes_actions';

// Initializing variables
const items = [{id:1, name: "Create new note", link: "", isLink: false}];

// Class declaration
class CreateNote extends Component{

	constructor(props){
		super(props);
		this.loadNotebooks = this.loadNotebooks.bind(this);
		this.selectMethod = this.selectMethod.bind(this);
		this.validate = this.validate.bind(this);
		this.loadSections = this.loadSections.bind(this);
		this.sectionChanged = this.sectionChanged.bind(this);
		this.state = {service: 0, 
			tags: [], 
			noteTitle: "", 
			account: "", 
			notebook: "", 
			section: "",
			isTitle: true,
			isAccount: true,
			isNotebook: true, 
			isSection: true,
			isContent: true,
			content: "",
			lgShow: false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.onContentChanged = this.onContentChanged.bind(this);

	}

	componentDidMount(){
		this.props.displayBread(items);
	}

	handleChange(tags) {
    	this.setState({tags})
  	}


  	validate(){

  		var errors = [];

  		// Checking the note title
  		if (this.state.noteTitle == ""){
  			this.setState({isTitle: false});
  			this.titleInput.focus();
  			errors.push("noteTitle");
  		}
  		else{
  			this.setState({isTitle: true})
  		}

  		// Checking that account has been selected
  		if (this.state.account == ""){
  			this.setState({isAccount: false});
  			errors.push("account");
  		}

  		// Checking notebook
  		if (this.state.notebook == ""){
  			this.setState({isNotebook: false});
  			errors.push("notebook");
  		}

  		// If service is ONENOTE and Section GUID is not specified
  		if ( this.state.service == SERVICE_ONENOTE && this.state.section == "" ){
  			this.setState({isSection: false});
  			errors.push("section");
  		}
  		return (errors.length === 0);
  	}

  	selectMethod(){
  		if (!this.validate()){
  			return;
  		}

  		// Checking if the note content is empty
  		if (this.state.content == ""){
  			if (!window.confirm("Do you really want to create the empty note?")){
  				return;
  			}
  		}

  		// Opening the modal window with encryption method selection
  		this.setState({lgShow:true});
  	}

	loadNotebooks = (account_id,service) => {
		if (account_id != ""){
			this.setState({account: account_id, service: service});
			this.props.fetchNotebooks(account_id,true,"");
			this.setState({isAccount: true});
		}
		else{
			this.props.clearNotebooks();
		}
	}

	onContentChanged(content){
		this.setState({content:content});
		if (content == ""){this.setState({isContent: false});}
	}

	sectionChanged(section_id,name){
		if (section_id != ""){this.setState({isSection: true});}
		this.setState({section:section_id});

	}

	loadSections(notebook_guid,name){
		this.setState({notebook: notebook_guid});
		if (notebook_guid != ""){
			this.setState({isNotebook: true});
			if (parseInt(this.state.service) == SERVICE_ONENOTE){
				this.props.fetchSections(this.state.account,notebook_guid,true);
			}
		}
	}

	createNote(method,password,keys){

		// Preparing data for note creation
		var note = {
			account_id: this.state.account,
			guid: (this.state.section != "" ? this.state.section : this.state.notebook),
			title: this.state.noteTitle,
			tags: this.state.tags,
			content: this.state.content,
			method: method,
			password: password,
			keys: keys
		}	

		// Creating new note
		this.props.createNote(note);

	}

	render(){
		return (
			<div>				
				<div className={`form-group ${ !this.state.isTitle ? 'has-error' : '' }`}>
					<label>Title</label>
					<input ref={(input) => { this.titleInput = input; }}
						value={this.state.noteTitle} 
						onChange={ (event) => {this.setState({noteTitle:event.target.value,isTitle:true})} } 
						className="form-control" 
						type="text" 
						placeholder="Specify note's title" />
						{ this.state.isTitle ? ('') : (<div className="help-block">Note title is required</div>) }
						
				</div>

				<div className={`form-group ${ !this.state.isAccount ? 'has-error' : '' }`} >
					<label>Account</label>
					<AccountsDropdown id="" onChange={this.loadNotebooks} accounts={this.props.accounts} />
					{ this.state.isAccount ? ('') : (<div className="help-block">Account is required</div>) }
				</div>

				<div className={`form-group ${ !this.state.isNotebook ? 'has-error' : '' }`}>
					<label>Notebook</label>
					<NotebooksDropdown notebooks={this.props.notebooks} onChange={this.loadSections} />
					{ this.state.isNotebook ? ('') : (<div className="help-block">Notebook GUID is required</div>) }
				</div>

				<div className={`form-group ${ !this.state.isSection ? 'has-error' : '' }`}>
					<label>Section</label>
					<SectionsDropdown onChange={this.sectionChanged} sections={this.props.sections} service={this.state.service} />
					{ this.state.isSection ? ('') : (<div className="help-block">Section ID is required</div>) }
				</div>

				<div className="form-group">
					<label>Tags (Optional)</label>
					<TagsInput value={this.state.tags} onChange={this.handleChange} />
				</div>
				<div className={`form-group ${ !this.state.isContent ? 'has-error' : '' }`}>
					<NoteEditor onChange={this.onContentChanged} />
				</div>		
					
				<hr/>
				<div className="row">
					<div className="col-md-12">
						<button onClick={this.selectMethod} className="btn btn-primary">Encrypt</button>
					</div>
				</div>
				<EncryptModal onSelected={this.createNote.bind(this)} data={this.state} show={this.state.lgShow} onHide={()=> this.setState({lgShow:false})} />
			</div>
		)
	}

}

function mapStateToProps(state){
	return { 
			accounts: state.accounts.all,
			notebooks: state.notebooks.all,
			sections: state.sections.all 
		 };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		fetchNotebooks,clearNotebooks,
		displayBread,fetchSections,createNote},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateNote);