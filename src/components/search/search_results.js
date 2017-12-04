// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

// Init section

// Class section
class NotesSearch extends Component{

	constructor(props){
		super(props);
		this.state = {selected:[]};	
		this.renderResult = this.renderResult.bind(this);	
	}

	componentDidMount(){		
	}

	renderResult(result){
		return (
			<div>{result.title}</div>
		);
	}

	render(){
		
		return (
			<div>
				{this.props.results.map(this.renderResult)}
			</div>
		);
	}
}

function mapStateToProps(state){
	return { results: state.search.results };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NotesSearch);