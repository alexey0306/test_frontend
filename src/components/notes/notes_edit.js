// Import section
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//// Importing actions
import {editNote} from '../../actions/notes_actions';
import {fetchNotebooks} from '../../actions/notebooks_actions';
import {fetchSections} from '../../actions/sections_actions';

//// Import additional components
import Spinner from '../common/spinner';
import NotebooksDropdown from '../notebooks/notebooks_dropdown';
import SectionsDropdown from '../sections/sections_dropdown';
import RecipientsList from '../common/recipients_list';
import NoteEditor from './notes_editor';

// Init section
const html = "<strong>Test</strong>"

// Class section
class NotesEdit extends Component{

	constructor(props){
		super(props);
		this.state = {isTitle: true, title: "Default title", 
			notebook_guid: "", section_guid: "", isNotebook: true, isSection: true,
			content: "", recipients: [],service: 0
		};
	}

	componentWillReceiveProps(newProps){

		if (this.props.edited != newProps.edited){

			// Updating the state
			this.setState({
				title: newProps.edited.title,
				notebook_guid: newProps.edited.notebook_guid,
				section_guid: newProps.edited.section_guid,
				content: newProps.edited.content,
				service: parseInt(newProps.edited.service),
				recipients: newProps.edited.recipients
			});
		}

	}

	componentDidMount(){
		this.props.editNote(this.props.params.guid);
		this.props.fetchNotebooks(this.props.params.id);
		if (this.state.section_guid != ""){
			this.props.fetchSections(this.props.params.id, this.state.section_guid,true);
		}
	}

	onContentChanged(content){
		this.setState({content:content});
		if (content == ""){this.setState({isContent: false});}
	}

	render(){
		// Checking
		if (!this.props.edited){
			return (<Spinner/>);
		}
		else{
			return (
				<div>
					<div className={`form-group ${ !this.state.isTitle ? 'has-error' : '' }`}>
						<label>Title</label>
						<input
							value={this.state.title || '' } 
							onChange={ (event) => {this.setState({title:event.target.value,isTitle:true})} } 
							className="form-control" 
							type="text" 
							placeholder="Specify note's title" />
							{ this.state.isTitle ? ('') : (<div className="help-block">Note title is required</div>) }
							
					</div>
					<div className={`form-group ${ !this.state.isNotebook ? 'has-error' : '' }`}>
						<label>Notebook</label>
						<NotebooksDropdown guid={this.props.edited.notebook_guid} notebooks={this.props.notebooks} />
						{ this.state.isNotebook ? ('') : (<div className="help-block">Notebook GUID is required</div>) }
					</div>
					<div className={`form-group ${ !this.state.isSection ? 'has-error' : '' }`}>
						<label>Section</label>
						<SectionsDropdown sections={this.props.sections} service={this.state.service} />
						{ this.state.isSection ? ('') : (<div className="help-block">Section ID is required</div>) }
					</div>
					<div>
						<label>Recipients</label>
						<RecipientsList selected={this.state.recipients} />
					</div>
					<div className={`form-group ${ !this.state.isContent ? 'has-error' : '' }`}>
						<NoteEditor content={this.state.content} onChange={this.onContentChanged.bind(this)} />
					</div>
				</div>
			);
		}
	}
}

function mapStateToProps(state){
	return { 
		edited: state.notes.edited,
		notebooks: state.notebooks.all,
		sections: state.sections.all
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({editNote,fetchNotebooks},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NotesEdit);