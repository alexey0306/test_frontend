import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchNotebooks,sortNotebooks} from '../../actions/notebooks_actions';
import {no_notebooks_found, SERVICE_ONENOTE,SERVICE_EVERNOTE,PATHS} from '../../globals/globals';
import {Link} from 'react-router';
import _ from 'lodash';
import NotebooksPanel from './notebooks_panel';
import Breadcrumb from '../common/breadcrumb';
import {displayBread} from '../../actions/navigation_actions';
import {vsprintf} from 'sprintf-js';
import {setService} from '../../actions/globals_actions';


// Initializing variables
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

	componentWillReceiveProps(newProps){
		if (this.props.params.id != newProps.params.id){
			this.props.fetchNotebooks(newProps.params.id);
		}
	}

	onLinkClick(event){
		event.preventDefault();		
		// Setting the active notebook
		this.props.router.push(event.currentTarget.href);
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

	onAllChange(event){
		var arrayVar = [];
		if (event.target.checked){
			this.props.notebooks.map(function(notebook){
				arrayVar.push(notebook.guid);
			})
		}
		this.setState({selected:arrayVar});
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
				link = vsprintf(PATHS.notes, [this.props.params.id, [notebook.name,notebook.guid].join("/")])
				break;
			case SERVICE_ONENOTE:
				link = vsprintf(PATHS.sections, [this.props.params.id,notebook.name,notebook.guid])
				break;
		}

		return (<tr key={notebook.guid} onClick={this.onRowClick} id={notebook.guid} className="selected">
				<td><input
					id={notebook.guid} 
					type="checkbox" 
					onClick={this.onNotebookClick}
					checked={_.includes(this.state.selected,notebook.guid)} />
				</td>
				<td><Link to={link}>{notebook.name}</Link></td>
				<td>{notebook.guid}</td>
				<td>{notebook.created}</td>
				<td>{notebook.shared ? (<i title="Shared" className="fa fa-users" aria-hidden="true"></i>) : 'n/a'}</td>
			</tr>
		);
	}

	componentDidMount(){
		this.props.fetchNotebooks(this.props.params.id);
		this.props.displayBread(items);		
	}

	render(){
		return (
			<div>
			<NotebooksPanel selected={this.state.selected} account={this.props.params.id} />
			<table className="table table-hover table-striped">
				<thead>
					<tr>
						<th><input onChange={this.onAllChange.bind(this)} type="checkbox" id='selectAll'/></th>
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
	return bindActionCreators({
		fetchNotebooks,sortNotebooks,
		displayBread},
	dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NotebooksList);