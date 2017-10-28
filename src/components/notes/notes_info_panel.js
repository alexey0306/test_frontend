import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchNote} from '../../actions/notes_actions';


class NotesInfoPanel extends Component{
	render(){
		return (
			<div></div>
		);
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchNote},dispatch);
}

export default connect(null,mapDispatchToProps)(NotesInfoPanel);