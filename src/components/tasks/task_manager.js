// Import section
import React,{Component} from 'react';
import {connect} from 'react-redux';

//// Importing additional actions
import TaskItem from './task_item';

// Init section
const status = ["6de339f5-fb6c-481b-a8fc-09d77bc84267"]

// Class section
class TaskManager extends Component{

	render(){
		console.log(this.props.tasks);
		return (
			<div>
				{this.props.tasks.map(function(item){
					return <TaskItem task={item} />
				})}
			</div>
		);
	}

}

function mapStateToProps(state){
  return {
  	tasks: state.tasks.tasks
  };
}

export default connect(mapStateToProps,null)(TaskManager);