// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DecryptNoteModal from '../modals/decrypt_note';
import {millisToDate} from '../../globals/helpers';
import {DropdownButton,MenuItem,Popover,OverlayTrigger,Button} from 'react-bootstrap';
import _ from 'lodash';

// Init section
const styles = {
	icons:{
		marginLeft:'15px',
		color: "#bbb"
	},
	created:{
		fontSize:'1.2em',
		color: "#ddd",
		marginRight:'20px'
	},
	line:{
		display:'block',
		height: '1px',
		border:'0',
		borderTop: '1px solid #ddd',
		margin: '1em 0',
		padding: '0'
	}
};



// Class section
class NotesInfoPanel extends Component{

	constructor(props){
		super(props);
		this.state = {lgShow: false};
		this.renderTag = this.renderTag.bind(this);
	}

	renderTag(guid){
		var tagName = _.find(this.props.tags, {guid:guid});
		return (
			<div style={{marginTop:'5px'}} key={guid}><i className="fa fa-tag" aria-hidden="true"></i> {tagName.name}</div>
		)
	}

	toDate(timestamp){
		return millisToDate(timestamp);
	}
	
	render(){

		const popoverTags = (
			<Popover id="popoverTags">
				{this.props.note.tags.map(this.renderTag)}				
			</Popover>
		);

		const popoverInfo = (
			<Popover id="popoverInfo">
				<div><strong>Created:</strong> {this.toDate(this.props.note.created)}</div>
				<div><strong>Updated:</strong> {this.toDate(this.props.note.updated)}</div>
			</Popover>
		)

		return (
			<div>
				<div className="row">
					<div className="col-md-12" style={{paddingLeft:'10px'}}>
						
						<div style={styles.created} className="pull-right">
							<span><button onClick={() => this.props.onRefresh()} title="Redownload the note from the server" className="btn btn-default"><i className="fa fa-refresh" aria-hidden="true"></i> Refresh</button></span>

							{ this.props.note.encrypted ? 
								(<span></span>)
								:
								(<span><button onClick={() => this.props.onEncrypt()}className="btn btn-default" title="Encrypt note"><i className="fa fa-lock" aria-hidden="true"></i> Encrypt</button></span>
								)
							}

							{ this.props.note.backedup ? 
								(<span><button onClick={() => this.props.onRestore()} title="Restore the note from the backup" className="btn btn-default"><i className="fa fa-cloud-upload" aria-hidden="true"></i> Restore</button><button onClick={() => this.props.onDeleteBackup()} title="Delete the note backup" className="btn btn-default"><i className="fa fa-trash"></i> Delete backup</button></span>)
								:
								(<span></span>)
							}
							
							<span><button onClick={() => this.props.onFavourite()} title="Add to Favourites/Remove from Favourites" className="btn btn-default"><i  className="fa fa-star" aria-hidden="true"></i> Favourite</button></span>							 
							<OverlayTrigger trigger="click" placement="bottom" overlay={popoverTags}>
      							<Button><i className="fa fa-tags" aria-hidden="true"></i> Tags</Button>
    						</OverlayTrigger>
    						<OverlayTrigger trigger="click" placement="bottom" overlay={popoverInfo}>
      							<Button><i className="fa fa-info-circle" aria-hidden="true"></i> Info</Button>
    						</OverlayTrigger>
						</div>
					</div>
				</div>	
				<div style={styles.line}></div>			
			</div>
		);
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({},dispatch);
}

export default connect(null,mapDispatchToProps)(NotesInfoPanel);