// Import section
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {displayBread} from '../../actions/navigation_actions';
import TasksList from './tasks_list';
import TasksPanel from './tasks_panel';

// Initializing variables
const items = [{id:1, name: "Tasks", link: "", isLink:false}];

// Class declaration
class TasksIndex extends Component{

	constructor(props){
		super(props);
		this.state = {selected: []}
		this.onTasksChange = this.onTasksChange.bind(this);
	}

	componentDidMount(){
		this.props.displayBread(items);
	}

	onTasksChange(selected){
		this.setState({selected});
	}

	render(){
		return (
			<div>
				<TasksPanel selected={this.state.selected} />
				<TasksList onChange={this.onTasksChange} />
			</div>
		);
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({displayBread},dispatch);
}

export default connect(null,mapDispatchToProps)(TasksIndex);