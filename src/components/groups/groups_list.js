// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
// Import section
import {bindActionCreators} from 'redux';
import {fetchGroups} from '../../actions/groups_actions';
import _ from 'lodash';
import {Link} from 'react-router';
import GroupsPanel from './groups_panel';
import {no_groups_found} from '../../globals/globals';
import {displayBread} from '../../actions/navigation_actions';

// Initializing variables
const items = [{name:"Groups",link:"/groups",isLink:false}];

class GroupsList extends Component{

	constructor(props){
		super(props);
		this.state = {selected:[]};
		this.onRowClick = this.onRowClick.bind(this);
		this.renderGroup = this.renderGroup.bind(this);
		this.onAllChange = this.onAllChange.bind(this);
		this.onGroupSelect = this.onGroupSelect.bind(this);
	}

	onRowClick(event){
		var checked = event.currentTarget.querySelectorAll("input[type='checkbox']")[0].checked;
		var id = parseInt(event.currentTarget.id);
		this.selectGroup(id,!checked);
		event.stopPropagation();
	}

	onGroupSelect(event){
		event.stopPropagation();
		this.selectGroup(event.target.id,event.target.checked);
	}

 	selectGroup(id,checked){
		var arrayVar = this.state.selected;
		if (checked){
			arrayVar.push(parseInt(id));
		}
		else{
			arrayVar = arrayVar.filter(function(item){
				return item !== parseInt(id);
			});
		}
		this.setState({selected: arrayVar});
	}

	onAllChange(event){
		var arrayVar = [];
		if (event.target.checked){
			this.props.groups.map(function(user){
				arrayVar.push(user.id);
			})
		}
		this.setState({selected:arrayVar});
	}


	componentDidMount(){
		this.props.fetchGroups();
		this.props.displayBread(items);
	}

	renderGroup(group){
		return (
			<tr onClick={this.onRowClick} id={group.id} key={group.id} className="selected">
				<td><input id={group.id} onClick={this.onGroupSelect} checked={_.includes(this.state.selected,group.id)} type="checkbox"/></td>
				<td><Link to={"groups/"+group.id}>{group.name}</Link></td>
				<td>{group.dscr}</td>				
			</tr>
		);
	}

	render(){
		
		return (
			<div>
				<GroupsPanel selected={this.state.selected} />
				<table className="table table-hover table-striped">
					<thead>
						<tr>
							<th><input onChange={this.onAllChange} type="checkbox" id='selectAll'/></th>
							<th>Name <i className="fa fa-fw fa-sort sort" id={this.state.sort} onClick={this.sortUsers}></i></th>
							<th>Description</th>							
						</tr>
					</thead>
					<tbody>
						{this.props.groups.length == 0 ? no_groups_found : this.props.groups.map(this.renderGroup)}
					</tbody>
				</table>			
			</div>
		);
	}
}

function mapStateToProps(state){
	return { groups: state.groups.all };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchGroups,displayBread},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(GroupsList);