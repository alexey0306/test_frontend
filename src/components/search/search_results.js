// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import {no_notes_found} from '../../globals/globals';
import {Link} from 'react-router';

// Init section
const styles = {
	empty:{
		height:'100%',
		width:'100%',
		textAlign:'center',
		verticalAlign:'middle',
		fontSize:'1.8em',
		color:'#ddd',
	}
}

// Class section
class NotesSearch extends Component{

	constructor(props){
		super(props);
		this.state = {selected:[]};	
		this.renderResult = this.renderResult.bind(this);
		this.onSortClick = this.onSortClick.bind(this);
		this.getNotebook = this.getNotebook.bind(this);
	}

	onSortClick(){

	}

	getNotebook(notebook){
		var notebookName = "";
		this.props.notebooks.map(function(item){
			if (item.guid == notebook){
				notebookName = item.name;
				return;
			}
		})

		return notebookName;
	}

	componentDidMount(){		
	}

	renderResult(result){

		//var link = "http://localhost:3000/notes/1/Saferoom%20Business/db886d61-5939-4cfd-a1fd-a2bcaba414c8/7bc6c49a-0b0c-4679-a411-abc818d9ae92";

		var notebookName = this.getNotebook(result.notebook.id);
		var linkArray = [this.props.account,notebookName,result.notebook.id];
		if (result.section.id){
			linkArray.push(result.section.name);
			linkArray.push(result.section.id);
		}
		linkArray.push(result.guid);
		var link = "notes/"+linkArray.join("/");


		return (
			<tr key={result.guid} className="selected">
				<td><Link target="_blank" to={link}>{result.title}</Link></td>
				<td>{result.guid}</td>
				<td>{result.created}</td>
				<td>{result.updated}</td>
			</tr>
		);
	}

	

	render(){
		return (
			<div>
			<table className="table table-hover table-striped">
				<thead>
					<tr>
						<th>Name <i className="fa fa-fw fa-sort sort" id="title" onClick={this.onSortClick}></i></th>
						<th>GUID</th>
						<th>Created <i id="created" className="fa fa-fw fa-sort sort" onClick={this.onSortClick}></i></th>
						<th>Updated <i id="updated" className="fa fa-fw fa-sort sort" onClick={this.onSortClick}></i></th>
					</tr>
				</thead>
				<tbody>
					{ this.props.results.length == 0 ? no_notes_found : this.props.results.map(this.renderResult) }
				</tbody>
			</table>
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