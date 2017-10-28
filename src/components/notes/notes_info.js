import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchNote} from '../../actions/notes_actions';
import Breadcrumb from '../common/breadcrumb';
import DOMPurify from 'dompurify';
import NotesInfoPanel from './notes_info_panel';


class NotesInfo extends Component{

	componentDidMount(){
		this.props.fetchNote(this.props.params.id, this.props.params.guid);
	}

	render(){
		const items = [
			{
				id:1, 
				name: "Notebooks" ,
				link: `/notebooks/list/${this.props.params.id}`, 
				isLink: true
			},
			{
				id:1, 
				name: this.props.active.name ,
				link: `/notes/${this.props.params.id}/list/${this.props.active.guid}`, 
				isLink: true
			}
			];
		console.log(this.props.note.content);
		return (
			<div>
				<Breadcrumb items={items} lastItem={this.props.note} />
				<div 
					dangerouslySetInnerHTML={{__html: this.props.note.content}}>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state){
	return { 
			note: state.notes.note, 
			active: state.notebooks.active
		 };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchNote},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NotesInfo);