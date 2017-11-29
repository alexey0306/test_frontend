// Import section
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchTasks,fetchTask} from '../../actions/tasks_actions';
import {no_tasks_found} from '../../globals/globals';
import _ from 'lodash';
import {Label} from 'react-bootstrap';
import {Link} from 'react-router';
import TaskInfoModal from '../modals/task_info';

// Initializing variables
const STATUS_ACTIVE = 1;
const STATUS_FINISHED = 0;
const STATUS_ERROR = 2;

// Class declaration
class TasksList extends Component{
	constructor(props){
		super(props);
		this.state = {selected: [],lgShow:false}
		this.renderTask = this.renderTask.bind(this);
	}

	onRowClick(event){
		var checked = event.currentTarget.querySelectorAll("input[type='checkbox']")[0].checked;
		var id = parseInt(event.currentTarget.id);
		console.log(id);
		this.selectTask(id,!checked);
		event.stopPropagation();
	}

	onTaskSelect(event){
		event.stopPropagation();
		this.selectTask(event.target.id,event.target.checked);
	}

	onAllChange(event){
		var arrayVar = [];
		if (event.target.checked){
			this.props.tasks.map(function(task){
				arrayVar.push(task.id);
			})
		}
		console.log(arrayVar);
		this.setState({selected:arrayVar});
		this.props.onChange(arrayVar);
	}

	selectTask(id,checked){
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
		this.props.onChange(arrayVar);
	}

	showTask(event){
		// Stopping the propagation
		event.stopPropagation();
		event.preventDefault();

		// Getting task information
		this.props.fetchTask(event.target.id);

		// Displaying the modal with task information
		this.setState({lgShow: true});
		
		return false;
	}

	renderTask(task){
		var status;
		switch (task.status){
			case STATUS_ACTIVE:
				status = <Label bsStyle="warn">Active</Label>
				break;
			case STATUS_FINISHED:
				status = <Label bsStyle="success">Finished</Label>
				break;
			case STATUS_ERROR:
				status = <Label bsStyle="danger">Failed</Label>
				break;
		}
		console.log(task.status);
		return (
			<tr key={task.id} onClick={this.onRowClick.bind(this)} id={task.id} className="selected">
				<td><input
					id={task.id} 
					type="checkbox" 
					onClick={this.onTaskSelect.bind(this)}
					checked={_.includes(this.state.selected,task.id)} />
				</td>
				<td><a href="" onClick={this.showTask.bind(this)} id={task.id}>{task.name}</a></td>
				<td>{task.dscr}</td>
				<td>{status}</td>
			</tr>
		);
	}

	componentDidMount(){
		this.props.fetchTasks();
	}

	render(){
		return (
			<div>
			<table className="table table-hover table-striped">
				<thead>
					<tr>
						<th><input onChange={this.onAllChange.bind(this)} type="checkbox" id='selectAll'/></th>
						<th>Name <i className="fa fa-fw fa-sort sort" id="name" onClick={this.onSortClick}></i></th>
						<th>Description</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{ this.props.tasks.length == 0 ? no_tasks_found : this.props.tasks.map(this.renderTask) }
				</tbody>
			</table>
			<TaskInfoModal show={this.state.lgShow} onHide={()=> this.setState({lgShow:false})}/>
			</div>
		);
	}
}

function mapStateToProps(state){
	return { tasks: state.tasks.all };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchTasks,fetchTask},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(TasksList);