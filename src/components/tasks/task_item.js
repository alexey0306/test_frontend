// Import section
import React,{Component} from 'react';
import {ProgressBar} from 'react-bootstrap';

//// Importing additional component/actions
import {custom_axios} from '../../globals/helpers';
import {ROOT_URL} from '../../actions/index';

// Init section
const STATUS_SUCCESS = "SUCCESS";
const STATUS_PROGRESS = "PROGRESS";

// Class section
class TaskItem extends Component{

	constructor(props){
		super(props);
		this.state = {completed: 0, total: 0, title: "", started: "", current: "",percent: 0}
		this.getStatus = this.getStatus.bind(this);
		this.calculatePercent = this.calculatePercent.bind(this);
	}

	calculatePercent(){

		let total = this.state.total;
		let completed = this.state.completed;
		let percent = (completed/total)*100;
		this.setState({percent});
	}

	getStatus(){

		let self = this;
		// Creating URL
		const URL = `${ROOT_URL}tasks/status/${this.props.task.id}`;

		custom_axios().get(URL)
		.then((response) => {

			// Checking task status
			if (response.data.state == STATUS_SUCCESS){
				this.setState({
					current: response.data.current,
					total: response.data.total,
					completed: response.data.completed,
					percent: 100
				},function(){
					clearInterval(self.interval);
				});
			}
			else {

				// Updating the state
				this.setState({
					current: response.data.current,
					total: response.data.total,
					completed: response.data.completed
				},function(){
					this.calculatePercent();
				});
			}		

		})
		.catch((err) => {
			console.log(err);
		});
	}

	componentWillUnmount(){
		// After unmounting the component we need to stop the periodic update
		clearInterval(this.interval);
	}

	componentDidMount(){

		// When component is mounted, we need to start the Update function that will periodically check the status of current task
		this.getStatus();
		this.interval = setInterval(this.getStatus, 3000);

	}

	render(){
		return (
			<div>
			<div className="form-group">
				<label>{this.props.task.title}</label>
				<ProgressBar now={this.state.percent} />
				<div className="help-block">Now: {this.state.current} <span className="pull-right">Completed {this.state.completed} out of {this.state.total}</span></div>
			</div><hr/>
			</div>
		);
	}

}

export default TaskItem;