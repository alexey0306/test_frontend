// Import section
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteFavourites} from '../../actions/notes_actions';

// Init section

// Class section
class FavouritesPanel extends Component{

	onDelete(){

		if (this.props.selected.length == 0){
			alert("Please select items to delete");
			return false;
		}

		if (window.confirm("Are you sure that you want to delete selected items?")){
			this.props.deleteFavourites(this.props.selected);
		}
	}

	render(){
		return (
			<div>
				<div className="row">
					<div className="col-md-11">
						<span>
							<button onClick={this.onDelete.bind(this)} type="button" className="btn btn-default" title="Create a new user">
								<i className="fa fa-trash-o" aria-hidden="true"></i> Delete
							</button>
						</span>
					</div>
					<div className="col-md-1"></div>
				</div><br/>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({deleteFavourites},dispatch);
}

export default connect(null,mapDispatchToProps)(FavouritesPanel);
