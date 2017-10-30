import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


class NoteEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
    	<div style={{width:'80%'}}>
    	<Editor
        	initialEditorState={editorState}
        	wrapperClassName="demo-wrapper"
        	editorClassName="demo-editor"
        	onEditorStateChange={this.onEditorStateChange}
      	/>
      	<textarea
          disabled className="form-control"
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
      	</div>
    );
  }
}

export default NoteEditor;