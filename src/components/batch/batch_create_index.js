// Import section
import React,{Component} from 'react';
import ReactDom from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import $ from "jquery";

//// Importing additional component and actions
import {displayBread} from '../../actions/navigation_actions';
import AccountsDropdown from '../accounts/accounts_dropdown';
import {fetchAccounts,fetchDefault,clearDefaultNotebook,setDefaultNotebook} from '../../actions/accounts_actions';
import {fetchNotebooks,clearNotebooks} from '../../actions/notebooks_actions';
import {batchCreate} from '../../actions/notes_actions';
import DropzoneArea from '../common/dropzone';
import EncryptModal from '../modals/encrypt_method';
import NotebooksListModal from '../modals/notebooks_list';

// Init section
const items = [{id:1, name:"Batch Encryption",link:"",isLink: false}];

// Class section
class BatchCreateIndex extends Component{

	constructor(props){
		super(props);
		this.state = {account:-1,files:[],lgShow:false,split:false, modalNotebooks: false }
	}

	componentDidMount(){
		this.props.displayBread(items);
		this.props.fetchAccounts();
	}

	onAccountSelect(account){
		this.setState({account});
		this.props.fetchDefault(account);
	}

	onDrop(files){
		this.setState({files});
	}

	selectMethod(){
		this.setState({lgShow:true});
	}

	createNote(method,password,keys){

		// Preparing request
		var data = {
			method: method,
			password: password,
			keys:keys,
			account: this.state.account,
			split:this.state.split,
			files:this.state.files,
			notebookGuid: this.props.default.guid
		}
		
		// Sending the request
		this.props.batchCreate(data);

	}

	changeNotebook(){
		this.props.clearNotebooks();
		this.props.fetchNotebooks(this.state.account,true);
		this.setState({modalNotebooks: true});
	}

	componentWillUnmount(){
		this.props.clearDefaultNotebook();
	}

	onSplitChange(event){
		this.setState({split:!!parseInt(event.target.value)});
		event.stopPropagation();
		return false;
	}

	onNotebookSelected(notebook){
		this.props.setDefaultNotebook(notebook);
	}

	render(){
		return (
			<div>
				<div ref={ el => this.container = el }></div>
				<div className="form-group">
					<label>Account:</label>
					<AccountsDropdown accounts={this.props.accounts} onChange={this.onAccountSelect.bind(this)} />					
				</div>
				{ this.props.default != null ? (
					<div className="form-group" style={{marginTop:'20px',marginBottom: '20px'}}>
						<label>Notebook the notes will be uploaded to:</label>
						<div className="defaultNotebook"><i className="fa fa-book" style={{marginRight:'10px'}}></i> { this.props.default.name }
						<span style={{marginLeft: '20px'}}><a id={this.state.account} onClick={this.changeNotebook.bind(this)} href="#">Change</a></span></div>
					</div>
				) : null }
				
				<div className="form-group">
					<label>Files to upload:</label>
					<DropzoneArea onDropped={this.onDrop.bind(this)} />
				</div>
				<div className="form-group">
					<label>Split into multiple notes:</label>					
					<select onChange={this.onSplitChange.bind(this)} className="form-control" style={{width:'25%'}}>
						<option value="0">Disabled</option>
						<option value="1">Enabled</option>
					</select>
					<div className="help-block">By default all files will be included into one note. If you enable this option, a separate note will be created for each file</div>
				</div>
				<div>
          			<button onClick={this.selectMethod.bind(this)} className="btn btn-primary"> Start</button>
          		</div>
          		<EncryptModal onSelected={this.createNote.bind(this)} show={this.state.lgShow} onHide={()=> this.setState({lgShow:false})} />
          		<NotebooksListModal show={this.state.modalNotebooks} onHide={()=> this.setState({modalNotebooks:false})} onNotebookSelected={this.onNotebookSelected.bind(this)}  />
			</div>
		);
	}
}

function mapStateToProps(state){
	return { accounts: state.accounts.all, default: state.accounts.defaultNotebook };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		displayBread,fetchAccounts,batchCreate,
		fetchDefault,clearDefaultNotebook,
		fetchNotebooks,clearNotebooks,setDefaultNotebook
	},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(BatchCreateIndex);