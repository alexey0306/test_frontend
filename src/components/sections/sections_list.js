import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchSections} from '../../actions/sections_actions';
import {no_sections_found,PATHS} from '../../globals/globals';
import _ from 'lodash';
import {Link} from 'react-router';
import {vsprintf} from 'sprintf-js';

class SectionsList extends Component{

	constructor(props){
		super(props);
		this.state = {selected: [], sort: 'asc', sortField: ''};
		this.onRowClick = this.onRowClick.bind(this);
		this.onSectionClick = this.onSectionClick.bind(this);
		this.renderSection = this.renderSection.bind(this);
		this.onAllChange = this.onAllChange.bind(this);
	}

	componentDidMount(){
		this.props.fetchSections(this.props.id,this.props.guid);
	}

	renderSection(section){

		const link = vsprintf(PATHS.notes,[
				this.props.id, 
				[this.props.notebook,
				this.props.guid,
				section.name,
				section.guid].join("/")]);
		return (
			<tr key={section.guid} onClick={this.onRowClick} id={section.guid} className="selected">
				<td><input
					id={section.guid} 
					type="checkbox" 
					onClick={this.onSectionClick}
					checked={_.includes(this.state.selected,section.guid)} />
				</td>
				<td><Link to={link}>{section.name}</Link></td>
				<td>{section.guid}</td>
				<td>{section.created}</td>
				<td>{section.modified}</td>
			</tr>
		);
	}

	onSectionClick(event){
		event.stopPropagation();
		this.selectSection(event.target.id,event.target.checked);
	}

	onRowClick(event){
		var checked = event.currentTarget.querySelectorAll("input[type='checkbox']")[0].checked;
		this.selectSection(event.currentTarget.id,!checked);
		event.stopPropagation();
	}

	selectSection(id,checked){
		var arrayVar = this.state.selected;
		if (checked){arrayVar.push(id);}
		else{
			arrayVar = arrayVar.filter(function(item){
				return item !== id;
			});
		}
		this.setState({selected: arrayVar});
		this.props.onChange(arrayVar);
	}

	onAllChange(event){
		var arrayVar = [];
		if (event.target.checked){
			this.props.sections.map(function(section){
				arrayVar.push(section.guid);
			})
		}
		this.setState({selected:arrayVar});
		this.props.onChange(arrayVar);
	}

	render(){
		return (
			<div>
			<table className="table table-hover table-striped">
				<thead>
					<tr>
						<th><input onChange={this.onAllChange} type="checkbox" id='selectAll'/></th>
						<th>Name <i className="fa fa-fw fa-sort sort" id="name" onClick={this.onSortClick}></i></th>
						<th>GUID</th>
						<th>Created <i id="created" className="fa fa-fw fa-sort sort" onClick={this.onSortClick}></i></th>
						<th>Modified <i id="modified" className="fa fa-fw fa-sort sort" onClick={this.onSortClick}></i></th>
					</tr>
				</thead>
				<tbody>
					{ this.props.sections.length == 0 ? no_sections_found : this.props.sections.map(this.renderSection) }
				</tbody>
			</table>
			</div>
		);
	}
}

function mapStateToProps(state){
	return { sections: state.sections.all };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchSections},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SectionsList);