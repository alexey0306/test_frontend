// Import section
import React,{Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Spinner from '../common/spinner';
import TaskInfo from '../tasks/task_info';
import {fetchTask} from '../../actions/tasks_actions';

class TaskInfoModal extends Component{

	render(){
		const { handleSubmit, pristine, reset, submitting } = this.props;
		return (
			<form>
				<Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
					<Modal.Header closeButton className={`service_`+this.props.service}>
						<Modal.Title id="contained-modal-title-lg">Task Info</Modal.Title>
					</Modal.Header>
					<Modal.Body className="modalBody">
						{ !this.props.task.name ? 
							(<Spinner />) : 
							(<TaskInfo task={this.props.task} />) 
						}
					</Modal.Body>
					<Modal.Footer>						
						<button className="btn btn-danger" onClick={this.props.onHide}>Close</button>
					</Modal.Footer>
				</Modal>
				</form>			
		);
	}
}

function mapStateToProps(state){
	return { task: state.tasks.task };
}

export default connect(mapStateToProps,null)(TaskInfoModal);