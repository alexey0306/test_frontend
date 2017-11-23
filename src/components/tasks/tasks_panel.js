// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteTasks} from '../../actions/tasks_actions';

// Initializing variables

// Class declaration
class TasksPanel extends Component{

	constructor(props){
		super(props);
		this.state = {term:""}
	}

	onDelete(){
		if (this.props.selected.length == 0){
			alert("Please selects tasks to delete");
			return;
		}
		if (window.confirm("Are you sure that you want to delete selected tasks?")){
			this.props.deleteTasks(this.props.selected)
		}
	}

	onChange(event){
		this.setState({term:event.target.value});
	}

	render(){
		return (
			<div>
			<div className="row">
				<div className="col-md-11">
					<div className="col-md-12">
						<span>
							<button type="button" onClick={this.onDelete.bind(this)} className="btn btn-default" title="Delete users">
								<i className="fa fa-trash" aria-hidden="true"></i> Delete
							</button>
						</span>
					</div>					
				</div>
			</div><br/>
			</div>
		);
	}

}

function mapDispatchToProps(dispatch){
	return bindActionCreators({deleteTasks},dispatch);
}

export default connect(null,mapDispatchToProps)(TasksPanel);