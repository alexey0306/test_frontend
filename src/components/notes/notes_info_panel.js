import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchNote} from '../../actions/notes_actions';
import DecryptNoteModal from '../modals/decrypt_note';


class NotesInfoPanel extends Component{

	constructor(props){
		super(props);
		this.state = {lgShow: false};
	}
	
	render(){
		return (
			<div>
				<div className="row">
					<div className="col-md-11">
						<span>
							<button type="button" onClick={this.onDelete} className="btn btn-default" title="Encrypt selected notebooks">
								<i className="fa fa-unlock" aria-hidden="true"></i> Restore
							</button>
						</span>
						<span>
							<button type="button" className="btn btn-default" title="Encrypt selected notebooks">
								<i className="fa fa-star-o" aria-hidden="true"></i> Favourite
							</button>
						</span>
						<span>
							<button type="button" onClick={this.onDelete} className="btn btn-default" title="Encrypt selected notebooks">
								<i className="fa fa-refresh" aria-hidden="true"></i> Refresh
							</button>
						</span>
					</div>		
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchNote},dispatch);
}

export default connect(null,mapDispatchToProps)(NotesInfoPanel);