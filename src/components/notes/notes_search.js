// Import section
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';

// Init section

// Class section
class NotesSearch extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>Search results</div>
		);
	}
}

function mapStateToProps(state){
	return { notes: state.notes.found };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NotesSearch);