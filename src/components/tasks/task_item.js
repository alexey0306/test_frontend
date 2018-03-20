// Import section
import React,{Component} from 'react';
import {ProgressBar} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//// Importing additional component/actions
import {custom_axios} from '../../globals/helpers';
import {deleteTask} from '../../actions/tasks_actions';

// Init section
const STATUS_SUCCESS = "SUCCESS";
const STATUS_PROGRESS = "PROGRESS";
const STATUS_PENDING = "PENDING";

const styles = {
	progressBar: {
		marginTop: '10px',
		marginBottom: '10px'
	}
}

// Class section
class TaskItem extends Component{

	constructor(props){
		super(props);
		this.state = {
			completed: 0, total: 0, title: "", started: "", current: "",percent: 0,
			showDelete: false
		}
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

		// Preparing data
		const data = { id: this.props.task.id, total: this.props.task.total }

		// Creating URL
		custom_axios().post(this.props.task.url,data)
		.then((response) => {

			// Checking task status
			if (response.data.state == STATUS_PROGRESS){
				this.setState({
					current: response.data.current,
					total: response.data.total,
					completed: response.data.completed,
				},function(){
					this.calculatePercent();
				});
			}
			else {

				// Updating the state
				console.log(this.props.task);
				this.setState({
					current: "Done",
					total: this.props.task.total,
					completed: this.props.task.total
				},function(){
					this.calculatePercent();
					clearInterval(self.interval);
					this.setState({showDelete: true })
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
		this.interval = setInterval(this.getStatus, 1000);

	}

	render(){
		return (
			<div>
			<div className="form-group">
				<div>{this.props.task.title}
					{ this.state.showDelete == false ? null : 
						(   
						<span className="pull-right">
							<i onClick={() => this.props.deleteTask(this.props.task.id)} className="fa fa-times selected"></i>
						</span>
						)
					}
				</div>
				<ProgressBar style={styles.progressBar} now={this.state.percent} />
				<div className="help-block">{this.state.current} <span className="pull-right">Completed {this.state.completed} out of {this.state.total}</span></div>
			</div><hr/>
			</div>
		);
	}

}

function mapDispatchToProps(dispatch){
	return bindActionCreators({deleteTask},dispatch);
}
export default connect(null,mapDispatchToProps)(TaskItem);