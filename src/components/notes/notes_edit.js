// Import section
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//// Importing actions
import {editNote,updateNote} from '../../actions/notes_actions';
import {displayBread} from '../../actions/navigation_actions';
import {messages,confirmations} from '../../globals/messages';

//// Import additional components
import Spinner from '../common/spinner';
import RecipientsList from '../common/recipients_list';
import NoteEditor from './notes_editor';
import PanelAlert from '../common/panel_alert';

// Init section
const html = "<strong>Test</strong>"
var items = [{id:1, name: "Edit note" , link: "", isLink: false}];

// Class section
class NotesEdit extends Component{

	constructor(props){
		super(props);
		this.state = {
			isTitle: true, title: "Default title", 
			content: "", recipients: [],
			password: "",
			isAlert: false, alertText: "",
			node: null
		};
	}

	componentWillReceiveProps(newProps){

		if (this.props.edited != newProps.edited){
			
			// Updating the state
			this.setState({
				title: newProps.edited.title,
				content: newProps.edited.content,
				method: ( newProps.edited.recipients.length == 0 ? "password" : "cms" ),
				recipients: newProps.edited.recipients
			});

			// Updating items
			items.push({id:2, name: newProps.edited.title , link: "", isLink: false});
			this.props.displayBread(items);

		}

	}

	componentDidMount(){
		this.props.editNote(this.props.params.guid);
	}

	onContentChanged(content){
		this.setState({content:content});
		if (content == ""){this.setState({isContent: false});}
	}

	dismissAlert(){
		this.setState({isAlert: false,alertText:""});
	}

	updateRecipients(recipients){
		this.setState({recipients});
	}

	update(){

		// Hiding error
		this.setState({isAlert:false});
		
		// If we have password encrypted note, then we need to check password
		if ( this.state.method == "password" && this.state.password == "" ){
			this.setState({isAlert: true, alertText: messages.password_mandatory});
			this.inputPass.focus();
			this.el.scrollIntoView({ behavior: 'smooth' });			
			return;
		}

		// If we have CMS encrypted note, then we need to check that list of recipients is not empty
		if ( this.state.method == "cms" && this.state.recipients.length == 0 ){
			this.setState({isAlert: true, alertText: messages.no_recipients});
			this.el.scrollIntoView({ behavior: 'smooth' });
			return;
		}

		// Preparing keys
		var keys = []
		this.state.recipients.map(function(item){keys.push(item.id);})			

		// Preparing data
		const data = {
			account: this.props.edited.account,
			guid: this.props.edited.guid,
			keys: keys,
			title: this.state.title,
			password: this.state.password,
			method: this.state.method,
			content: this.state.content
		}

		// Sending the update request
		this.props.updateNote(data);
		
	}

	render(){
		// Checking
		if (!this.props.edited){
			return (<Spinner/>);
		}
		else{
			return (
				<div>
					<div ref={ el => {this.el = el} }></div>
					<PanelAlert onDismiss={this.dismissAlert.bind(this)} show={this.state.isAlert} text={this.state.alertText} />
					<div className={`form-group ${ !this.state.isTitle ? 'has-error' : '' }`}>
						<label>Title:</label>
						<input
							value={this.state.title || '' } 
							onChange={ (event) => {this.setState({title:event.target.value,isTitle:true})} } 
							className="form-control" 
							type="text" 
							placeholder="Specify note's title" />
							{ this.state.isTitle ? ('') : (<div className="help-block">Note title is required</div>) }
							
					</div>

					{ this.props.edited.recipients == 0 ? (

						<div>
							<label>Password:</label>
							<input
								ref = { inputPass => {this.inputPass = inputPass} }
								onChange={(event) => {this.setState({password:event.target.value})}} 
								type="password" className="form-control" placeholder="Password to encrypt this note"/>
						</div>

					) :
					(
						<div>
							<label>Recipients</label>
							<RecipientsList onChange={this.updateRecipients.bind(this)} recipients={this.props.edited.recipients} />
						</div>
					) }

					<br/>
					<div className={`form-group ${ !this.state.isContent ? 'has-error' : '' }`}>
						<NoteEditor content={this.state.content} onChange={this.onContentChanged.bind(this)} />
					</div>
					<hr/>
					<div className="row">
						<div className="col-md-12">
							<button onClick={this.update.bind(this)} className="btn btn-primary">Update</button>
						</div>
					</div>
				</div>
			);
		}
	}
}

function mapStateToProps(state){
	return { 
		edited: state.notes.edited,
		notebooks: state.notebooks.all,
		sections: state.sections.all
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({editNote,displayBread,updateNote},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NotesEdit);