// Import section
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {displayBread} from '../../actions/navigation_actions';
import AccountsDropdown from '../accounts/accounts_dropdown';
import NotebooksDropdown from '../notebooks/notebooks_dropdown';
import SectionsDropdown from '../sections/sections_dropdown';
import {fetchAccounts} from '../../actions/accounts_actions';
import DropzoneArea from '../common/dropzone';

// Init section
const items = [{id:1, name:"Batch Encryption",link:"",isLink: false}];

// Class section
class BatchCreateIndex extends Component{

	constructor(props){
		super(props);
		this.state = {service: 0}
	}

	componentDidMount(){
		this.props.displayBread(items);
		this.props.fetchAccounts();
	}

	onAccountSelect(account_id){

	}

	render(){
		console.log(this.props.accounts);
		return (
			<div>
				<div className="form-group">
					<label>Account:</label>
					<AccountsDropdown accounts={this.props.accounts} onChange={this.onAccountSelect.bind(this)} />
				</div>
				<div className="form-group">
					<label>Notebook:</label>
					<NotebooksDropdown notebooks={this.props.notebooks} />
				</div>
				<div className="form-group">
					<label>Section:</label>
					<SectionsDropdown sections={this.props.sections} service={this.state.service} />
				</div>
				<div className="form-group">
					<label>Files to upload:</label>
					<DropzoneArea />
				</div>		

			</div>
		);
	}
}

function mapStateToProps(state){
	return { 
			accounts: state.accounts.all,
			notebooks: state.notebooks.all,
			sections: state.sections.all 
		 };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({displayBread,fetchAccounts},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(BatchCreateIndex);