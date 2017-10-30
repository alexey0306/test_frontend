// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import NoteEditor from './notes_editor';
// Class declaration
class CreateNote extends Component{

	render(){
		return (
			<div>Create note
				<NoteEditor />
			</div>
		)
	}

}

export default CreateNote;