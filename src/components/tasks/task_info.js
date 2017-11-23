import React, {Component} from 'react';

class TaskInfo extends Component{

	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				<ul className="list-group">
					<li className="list-group-item"><strong>Name:</strong> {this.props.task.name}</li>
					<li className="list-group-item"><strong>Description:</strong> {this.props.task.dscr}</li>
					<li className="list-group-item"><strong>Output:</strong> {this.props.task.output}</li>
					<li className="list-group-item"><strong>Status: </strong> 
						{this.props.task.status == "0" ? 
							(<span className="label label-warning label-status">Stopped</span>) : 
							(<span className="label label-success label-status">Active</span>)
						}
					</li>
					<li className="list-group-item"><strong>Created:</strong> {this.props.task.created}</li>
					<li className="list-group-item"><strong>Stopped:</strong> {this.props.task.created}</li>
					

				</ul>
			</div>
		);
	}

}

export default TaskInfo;