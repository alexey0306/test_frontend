import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchNotes,sortNotes} from '../../actions/notes_actions';
import {no_notes_found} from '../../globals/globals';
import {Link} from 'react-router';
import _ from 'lodash';
import NotesPanel from './notes_panel';
import Breadcrumb from '../common/breadcrumb';
import {displayBread,setLastItem} from '../../actions/navigation_actions';

class NotesList extends Component {

	constructor(props){
		super(props);
		this.renderNote = this.renderNote.bind(this);
		this.onNoteClick = this.onNoteClick.bind(this);
		this.selectNote = this.selectNote.bind(this);
		this.onRowClick = this.onRowClick.bind(this);
		this.onSortClick = this.onSortClick.bind(this);
		this.state = {selected: [], sort: 'asc', sortField: ''};
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

	onSortClick(event){

		// Sorting the notebooks
		this.props.sortNotes(this.state.sort,event.target.id);

		// Sorting list of notebooks
		if (this.state.sort == "dsc"){this.setState({sort: "asc"});}
		else{this.setState({sort: "dsc"});}
	}



	renderNote(note){
		const link = `/notes/${this.props.params.id}/${this.props.params.guid}/${this.props.params.name}/${note.guid}`
		return (
			<tr key={note.guid} onClick={this.onRowClick} id={note.guid} className="selected">
				<td><input
					id={note.guid} 
					type="checkbox" 
					onClick={this.onNotebookClick}
					checked={_.includes(this.state.selected,note.guid)} />
				</td>
				<td><Link to={link}>{note.title}</Link></td>
				<td>{note.guid}</td>
				<td>{note.created}</td>
				<td>{note.updated}</td>
			</tr>
		);

	}

	componentDidMount(){
		this.props.fetchNotes(this.props.params.id,this.props.params.guid);
		const items = [{id:1, name: "Notebooks" , link: `/notebooks/list/${this.props.params.id}`, isLink: true}]
		this.props.displayBread(items);
		this.props.setLastItem({data: {name:this.props.params.name,guid:this.props.params.guid}});
	}

	render(){

		return (
			<div>
			<NotesPanel id={this.props.params.id} guid={this.props.params.guid} />
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

}

function mapStateToProps(state){
	return { 
			notes: state.notes.all, 
			active: state.notebooks.active
		 };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchNotes,sortNotes,displayBread,setLastItem},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NotesList);