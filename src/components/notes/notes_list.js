import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchNotes,sortNotes} from '../../actions/notes_actions';
import {no_notes_found,PATHS} from '../../globals/globals';
import {Link} from 'react-router';
import _ from 'lodash';
import NotesPanel from './notes_panel';
import {displayBread,setLastItem} from '../../actions/navigation_actions';
import {vsprintf} from 'sprintf-js';

class NotesList extends Component {

	constructor(props){
		super(props);
		this.renderNote = this.renderNote.bind(this);
		this.onNoteClick = this.onNoteClick.bind(this);
		this.selectNote = this.selectNote.bind(this);
		this.onRowClick = this.onRowClick.bind(this);
		this.onSortClick = this.onSortClick.bind(this);
		this.state = {selected: [], sort: 'asc', sortField: ''};
		this.generateLink = this.generateLink.bind(this);
	}

	onNoteClick(event){
		event.stopPropagation();
		this.selectNote(event.target.id,event.target.checked);
	}

	onRowClick(event){
		var checked = event.currentTarget.querySelectorAll("input[type='checkbox']")[0].checked;
		this.selectNote(event.currentTarget.id,!checked);
		event.stopPropagation();
	}

	selectNote(id,checked){
		var arrayVar = this.state.selected;
		if (checked){arrayVar.push(id);}
		else{
			arrayVar = arrayVar.filter(function(item){
				return item !== id;
			});
		}
		this.setState({selected: arrayVar});
	}

	componentWillUnmount() {
		this.props.setLastItem(null);
  	}

	onSortClick(event){

		// Sorting the notebooks
		this.props.sortNotes(this.state.sort,event.target.id);

		// Sorting list of notebooks
		if (this.state.sort == "dsc"){this.setState({sort: "asc"});}
		else{this.setState({sort: "dsc"});}
	}

	renderNote(note){
		return (
			<tr key={note.guid} onClick={this.onRowClick} id={note.guid} className="selected">
				<td><input
					id={note.guid} 
					type="checkbox" 
					onClick={this.onNotebookClick}
					checked={_.includes(this.state.selected,note.guid)} />
				</td>
				<td><Link to={this.generateLink(note.guid)}>{note.title}</Link></td>
				<td>{note.guid}</td>
				<td>{note.created}</td>
				<td>{note.updated}</td>
			</tr>
		);

	}

	componentDidMount(){

		var params = this.props.params;
		
		// Defining the first item in the bread
		var items = [{id:1, 
			name: "Notebooks" , 
			link: vsprintf(PATHS.notebooks,[params.id]),
			isLink: true}]

		// Adding other items
		if ( this.props.params.section_name ){
			items.push({id:2,name:params.notebook_name,
				link: vsprintf(PATHS.sections, [params.id, params.notebook_name,params.notebook_guid]),
				isLink: true});

			// Setting the last item
			this.props.setLastItem({data: {id: params.container_id, name: params.section_name}});
		}
		else{
			// Setting the last item
			this.props.setLastItem({data: {id: params.container_id, name:params.notebook_name}});
		}
		this.props.displayBread(items);
		this.props.fetchNotes(params.id,params.container_id);		
		
	}

	render(){

		return (
			<div>
			<NotesPanel id={this.props.params.id} guid={this.props.params.container_id} />
			<table className="table table-hover table-striped">
				<thead>
					<tr>
						<th><input type="checkbox"/></th>
						<th>Name <i className="fa fa-fw fa-sort sort" id="title" onClick={this.onSortClick}></i></th>
						<th>GUID</th>
						<th>Created <i id="created" className="fa fa-fw fa-sort sort" onClick={this.onSortClick}></i></th>
						<th>Updated <i id="updated" className="fa fa-fw fa-sort sort" onClick={this.onSortClick}></i></th>
					</tr>
				</thead>
				<tbody>
					{ this.props.notes.length == 0 ? no_notes_found : this.props.notes.map(this.renderNote) }
				</tbody>
			</table>
			</div>
		);
	}

	generateLink(guid){

		var params = this.props.params;
		var array = []
	
		// If Section is not specified
		if ( this.props.params.section_name && this.props.params.container_id ){
			array = [params.id, [params.notebook_name, params.notebook_guid,params.section_name,params.container_id,guid].join("/")];
		}
		else{
			array = [params.id,[params.notebook_name, params.container_id,guid].join("/")];
		}
		return vsprintf(PATHS.notes_info, array)
	}

}

function mapStateToProps(state){
	return { 
			notes: state.notes.all, 
			active: state.notebooks.active,
		 	lastItem: state.navigation.lastItem
		 };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchNotes,sortNotes,displayBread,setLastItem},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NotesList);