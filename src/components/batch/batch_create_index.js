// Import section
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {displayBread} from '../../actions/navigation_actions';
import AccountsDropdown from '../accounts/accounts_dropdown';
import {fetchAccounts} from '../../actions/accounts_actions';
import {batchCreate} from '../../actions/notes_actions';
import DropzoneArea from '../common/dropzone';
import EncryptModal from '../modals/encrypt_method';

// Init section
const items = [{id:1, name:"Batch Encryption",link:"",isLink: false}];

// Class section
class BatchCreateIndex extends Component{

	constructor(props){
		super(props);
		this.state = {account:-1,files:[],lgShow:false,split:false}
	}

	componentDidMount(){
		this.props.displayBread(items);
		this.props.fetchAccounts();
	}

	onAccountSelect(account){
		this.setState({account});
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
			files:this.state.files
		}

		// Sending the request
		this.props.batchCreate(data);

		
	}

	onSplitChange(event){
		this.setState({split:!!parseInt(event.target.value)});
		event.stopPropagation();
		return false;
	}

	render(){
		return (
			<div>
				<div className="form-group">
					<label>Account:</label>
					<AccountsDropdown accounts={this.props.accounts} onChange={this.onAccountSelect.bind(this)} />					
				</div>
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

			</div>
		);
	}
}

function mapStateToProps(state){
	return {accounts: state.accounts.all};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({displayBread,fetchAccounts,batchCreate},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(BatchCreateIndex);