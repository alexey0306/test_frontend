// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//// Importing additional actions
import {signout} from '../../actions/auth_actions';
import {fetchAdmin} from '../../actions/admin_actions';

//// Importing additional components
import TaskManagerModal from '../modals/task_manager';

class Header extends Component{

	constructor(props){
		super(props);
		this.state = {modalTask: false}
		this.onBarsClick = this.onBarsClick.bind(this);
	}

	onBarsClick(){
		this.props.onBarsClicked();
	}

	componentDidMount(){
		this.props.fetchAdmin();
	}

	render(){
		return (
			<div>
				<div className="header">
					<div style={{paddingLeft:'30px'}} className="headerItem">
						{ this.props.displayBars ? (<div style={{display:'inline'}}><i onClick={this.onBarsClick} className="fa fa-bars fa-2x" aria-hidden="true"></i></div>): (<div></div>) }
						<div style={{display:'inline',marginLeft:'30px'}}><img style={{width:'auto', maxHeight:'40px'}} src='/images/logo_text_inverted.png' /></div>
						{/*<div style={{display:'inline',marginLeft:'30px'}}><img style={{width:'auto', maxHeight:'40px'}} src='/images/logo_text_inverted.png' /></div> */}
						<div style={{display:'inline',marginRight:'30px'}} className="pull-right">
							<i title="Task Manager" onClick={() => this.setState({modalTask: true})} className="fa fa-tasks fa-2x custom-icon"></i>
							<i title="User profile" className="fa fa-user fa-2x custom-icon"></i>
							<i title="Get help" className="fa fa-question fa-2x custom-icon"></i>
							<i onClick={() => this.props.signout()} title="Log out" className="fa fa-sign-out fa-2x custom-icon"></i>
						</div>
					</div>					
				</div>
				<TaskManagerModal show={this.state.modalTask} onHide={()=> this.setState({modalTask:false})} />
			</div>			
		);
	}
}

function mapStateToProps(state){
	return { admin: state.admin.admin };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({signout,fetchAdmin},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);