// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import _ from 'lodash';
import {vsprintf} from 'sprintf-js';
import md5 from 'md5';

//// Importing additional actions
import {fetchNotes,sortNotes,setFavourite,fetchFavourites} from '../../actions/notes_actions';
import {no_notes_found,PATHS} from '../../globals/globals';
import {displayBread,setLastItem} from '../../actions/navigation_actions';
import {ROOT_URL} from '../../actions/index';
import {selectItem} from '../../globals/helpers';

// Import additional components
import NotesPanel from './notes_panel';


class NotesList extends Component {

	constructor(props){
		super(props);
		this.renderNote = this.renderNote.bind(this);
		this.onNoteClick = this.onNoteClick.bind(this);
		this.onRowClick = this.onRowClick.bind(this);
		this.onSortClick = this.onSortClick.bind(this);
		this.state = {selected: [], sort: 'asc', sortField: ''};
		this.generateLink = this.generateLink.bind(this);
		this.setFavourite = this.setFavourite.bind(this);
		this.isFavourite = this.isFavourite.bind(this);
	}

	onNoteClick(event){
		event.stopPropagation();
		this.setState({
			selected: selectItem(event.target.id,event.target.checked,this.state)
		});
	}

	onAllChange(event){
		var arrayVar = [];
		if (event.target.checked){
			this.props.notes.map(function(note){
				arrayVar.push(note.guid);
			})
		}
		this.setState({selected:arrayVar});
	}

	onRowClick(event){
		var checked = event.currentTarget.querySelectorAll("input[type='checkbox']")[0].checked;
		var arrayVar = selectItem(event.currentTarget.id,!checked, this.state);
		this.setState({selected: arrayVar});
		event.stopPropagation();
	}

	componentWillUnmount() {
		this.props.setLastItem(null);
  	}

  	setFavourite(event,guid,title){
  		
  		// Preparing data
  		var data = this.props.params;
  		data.note_guid = guid;
  		data.note_name = title;

  		// Sending request
  		this.props.setFavourite(data);
  		
  		// Stopping the event propagation
  		event.stopPropagation();
  	}

	onSortClick(event){

		// Sorting the notebooks
		this.props.sortNotes(this.state.sort,event.target.id);

		// Sorting list of notebooks
		if (this.state.sort == "dsc"){this.setState({sort: "asc"});}
		else{this.setState({sort: "dsc"});}
	}

	isFavourite(guid){

		var isFavourite = false;
		var current_link = md5(decodeURIComponent(document.location.pathname.substring(1).replace("list/","")+"/"+guid));
		this.props.favourites.map(function(item){
			if (current_link == item.hash){
				isFavourite = true;return;
			}
		});
		return isFavourite;
	}

	getBackup(event,guid){
		event.stopPropagation();
		window.location.href = `${ROOT_URL}files/backup/${guid}`;
	}

	renderNote(note){
		return (
			<tr key={note.guid} onClick={this.onRowClick} id={note.guid} className="selected">
				<td><input
					id={note.guid} 
					type="checkbox" 
					onClick={this.onNoteClick}
					checked={_.includes(this.state.selected,note.guid)} />
				</td>
				<td>
					<Link to={this.generateLink(note.guid)}>{note.title}</Link>
					{ this.isFavourite(note.guid) ? 
					(
						<i style={{marginLeft:'10px'}} name={note.title} id={note.guid} onClick={(event) => this.setFavourite(event,note.guid,note.title) } className="fa fa-star" aria-hidden="true"></i>
					):
					(
						<i style={{marginLeft:'10px'}} name={note.title} id={note.guid} onClick={(event) => this.setFavourite(event,note.guid,note.title) } className="fa fa-star-o" aria-hidden="true"></i>	
					) }

					{ note.backedup ? 
					(
						<i style={{marginLeft:'10px'}} title="Download note backup" onClick={(event) => this.getBackup(event,note.guid)} className="fa fa-cloud-download" aria-hidden="true"></i>
					):
					(
						<span></span>
					) }
					
				</td>
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
		this.props.fetchFavourites();	
		
	}

	render(){

		return (
			<div>
			<NotesPanel selected={this.state.selected} account={this.props.params.id} guid={this.props.params.container_id} />
			<table className="table table-hover table-striped">
				<thead>
					<tr>
						<th><input type="checkbox" onClick={this.onAllChange.bind(this)}/></th>
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
		 	lastItem: state.navigation.lastItem,
		 	favourites: state.notes.favourites
		 };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		fetchNotes,sortNotes,displayBread,
		setLastItem,setFavourite,fetchFavourites},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NotesList);