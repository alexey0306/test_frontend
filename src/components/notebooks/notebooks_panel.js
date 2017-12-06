/*
	Name: NotebooksPanel
	Purpose: This component is used to hold the buttons and search bar for the Notebook list
	Created: 17.10.2017
	Author: Alexey Zelenkin
*/

// Import section
import React, {Component} from 'react';
import {fetchNotebooks,encryptNotebooks} from '../../actions/notebooks_actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SearchBar from '../common/search_bar';
import {Alert} from 'react-bootstrap';
import EncryptModal from '../modals/encrypt_method';
import PanelAlert from '../common/panel_alert';

// Declaring class
class NotebooksPanel extends Component{

	constructor(props){
		super(props);
		this.state = {term:'',alertVisible:false,alertText:'',lgShow:false}
		this.onChange = this.onChange.bind(this);
		this.onSearchClick = this.onSearchClick.bind(this);
		this.onRefresh = this.onRefresh.bind(this);
	}

	dismissAlert() {
    	this.setState({ alertVisible: false});
 	}

	onRefresh(){
		this.props.fetchNotebooks(this.props.account,true,this.state.term);
	}

	onEncrypt(){
		if (this.props.selected.length == 0){
			this.setState({alertVisible:true,alertText:"Please select notebooks to encrypt"});
			return false;
		}
		this.setState({alertVisible:false,lgShow:true});		
	}

	encryptNotebook(method,password,keys){
		this.props.encryptNotebooks({
			account:this.props.account,
			guids: this.props.selected,
			method:method,
			psw: password,
			keys: keys
		});
	}

	
	onSearchClick(event){
		event.preventDefault();
		this.props.fetchNotebooks(this.props.notebook_id,false,this.state.term);
	}

	onChange(event){		
		this.setState({term:event.target.value});
	}
	
	render(){
		return (
			<div>
			<PanelAlert onDismiss={this.dismissAlert.bind(this)} show={this.state.alertVisible} text={this.state.alertText} />
			<div className="row">
				<div className="col-md-11">
					<div className="col-md-3">
						<span>
							<button type="button" className="btn btn-default" onClick={this.onRefresh} title="Refresh a list of notebooks">
								<i className="fa fa-refresh" aria-hidden="true"></i> Refresh
							</button>
						</span>
						<span>
							<button type="button" onClick={this.onEncrypt.bind(this)} className="btn btn-default" title="Encrypt selected notebooks">
								<i className="fa fa-lock" aria-hidden="true"></i> Encrypt
							</button>
						</span>
					</div>
					<div className="col-md-9">
						<SearchBar onSearch={this.onSearchClick} />
					</div>					
				</div>
			</div><br/>
			<EncryptModal onSelected={this.encryptNotebook.bind(this)} show={this.state.lgShow} onHide={()=> this.setState({lgShow:false})} />
			</div>
		);
	}
}


function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchNotebooks,encryptNotebooks},dispatch);
}

export default connect(null,mapDispatchToProps)(NotebooksPanel);