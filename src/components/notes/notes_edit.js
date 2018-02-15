// Import section
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//// Importing actions
import {editNote} from '../../actions/notes_actions';
import {fetchNotebooks} from '../../actions/notebooks_actions';

//// Import additional components
import Spinner from '../common/spinner';
import NotebooksDropdown from '../notebooks/notebooks_dropdown';

// Init section

// Class section
class NotesEdit extends Component{

	constructor(props){
		super(props);
		this.state = {isTitle: true, title: "Default title", 
			notebook_guid: "", section_guid: "", isNotebook: true,
			content: "", recipients: []
		};
	}

	componentWillReceiveProps(newProps){

		if (this.props.edited != newProps.edited){

			// Updating the state
			this.setState({
				title: newProps.edited.title,
				notebook_guid: newProps.edited.notebook_guid,
				section_guid: newProps.edited.section_guid,
				content: newProps.edited.content
			});
		}

	}

	componentDidMount(){
		this.props.editNote(this.props.params.guid);
		this.props.fetchNotebooks(this.props.params.id);
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
				</div>
			);
		}
	}
}

function mapStateToProps(state){
	return { 
		edited: state.notes.edited,
		notebooks: state.notebooks.all
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({editNote,fetchNotebooks},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NotesEdit);