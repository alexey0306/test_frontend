// Import section
import React,{Component} from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';

import TaskManager from '../tasks/task_manager';

class TaskManagerModal extends Component{

	render(){
		return (
			<form>
				<Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-lg">Task Manager</Modal.Title>
					</Modal.Header>
					<Modal.Body className="modalBody">
						<TaskManager />
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

export default connect(mapStateToProps,null)(TaskManagerModal);