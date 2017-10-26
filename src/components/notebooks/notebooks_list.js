import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchNotebooks,sortNotebooks,setActive} from '../../actions/notebooks_actions';
import {no_notebooks_found, SERVICE_ONENOTE,SERVICE_EVERNOTE} from '../../globals/globals';
import {Link} from 'react-router';
import _ from 'lodash';
import NotebooksPanel from './notebooks_panel';
import Breadcrumb from '../common/breadcrumb';

const items = [{id:1, name: "Notebooks" , link: "", isLink: false}];
var link = "";

class NotebooksList extends Component {

	constructor(props){
		super(props);
		this.renderNotebook = this.renderNotebook.bind(this);
		this.onNotebookClick = this.onNotebookClick.bind(this);
		this.selectNotebook = this.selectNotebook.bind(this);
		this.onRowClick = this.onRowClick.bind(this);
		this.onSortClick = this.onSortClick.bind(this);
		this.state = {selected: [], sort: 'asc', sortField: ''};
		this.onLinkClick = this.onLinkClick.bind(this);
	}

	onLinkClick(event){
		event.preventDefault();		
		// Setting the active notebook
		this.props.setActive({name: event.target.id});
		this.props.router.push(event.currentTarget.name);
	}

	onNotebookClick(event){
		event.stopPropagation();
		this.selectNotebook(event.target.id,event.target.checked);
	}

	onRowClick(event){
		var checked = event.currentTarget.querySelectorAll("input[type='checkbox']")[0].checked;
		this.selectNotebook(event.currentTarget.id,!checked);
		event.stopPropagation();
	}

	selectNotebook(id,checked){
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
		this.props.sortNotebooks(this.state.sort,event.target.id);

		// Sorting list of notebooks
		if (this.state.sort == "dsc"){this.setState({sort: "asc"});}
		else{this.setState({sort: "dsc"});}
	}



	renderNotebook(notebook){
		var link = "";
		switch (parseInt(notebook.service)){
			case SERVICE_EVERNOTE:
				link = `/notes/${this.props.params.id}/list/${notebook.guid}`;
				break;
			case SERVICE_ONENOTE:
				link = `/sections/${this.props.params.id}/list/${notebook.guid}`;
				break;
		}

		return (
			<tr key={notebook.guid} onClick={this.onRowClick} id={notebook.guid} className="selected">
				<td><input
					id={notebook.guid} 
					type="checkbox" 
					onClick={this.onNotebookClick}
					checked={_.includes(this.state.selected,notebook.guid)} />
				</td>
				<td><a onClick={this.onLinkClick} name={link} id={notebook.name}>{notebook.name}</a></td>
				<td>{notebook.guid}</td>
				<td>{notebook.created}</td>
				<td>{notebook.shared}</td>
			</tr>
		);

	}

	componentDidMount(){
		this.props.fetchNotebooks(this.props.params.id);
	}

	render(){
		return (
			<div>
			<Breadcrumb items={items} />
			<NotebooksPanel notebook_id={this.props.params.id} />
			<table className="table table-hover table-striped">
				<thead>
					<tr>
						<th><input type="checkbox"/></th>
						<th>Name <i className="fa fa-fw fa-sort sort" id="name" onClick={this.onSortClick}></i></th>
						<th>GUID</th>
						<th>Created <i id="created" className="fa fa-fw fa-sort sort" onClick={this.onSortClick}></i></th>
						<th>Shared</th>
					</tr>
				</thead>
				<tbody>
					{ this.props.notebooks.length == 0 ? no_notebooks_found : this.props.notebooks.map(this.renderNotebook) }
				</tbody>
			</table>
			</div>
		);
	}

}

function mapStateToProps(state){
	return { notebooks: state.notebooks.all };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchNotebooks,sortNotebooks,setActive},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NotebooksList);