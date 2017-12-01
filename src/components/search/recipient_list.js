// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchRecipients} from '../../actions/search_actions';
import {Panel,ListGroup, ListGroupItem} from 'react-bootstrap';
import _ from 'lodash';

// Init section


// Class section
class RecipientList extends Component{

	constructor(props){
		super(props);
		this.onUserSelected = this.onUserSelected.bind(this);
		this.renderUser = this.renderUser.bind(this);
		this.state = {selected: []}
		this.startSearch = this.startSearch.bind(this);
	}

	onUserSelected(serial){
		var newArray = this.state.selected.slice();
		if (_.includes(this.state.selected,serial)){
			newArray = newArray.filter(function(item){
				return item !== serial;
			});
		}
		else{
			newArray.push(serial);
		}
		this.setState({selected: newArray});
	}

	startSearch(){
		this.props.onStartSearch("recipients",this.state.selected);
	}

	renderUser(user){
		return (
			<ListGroupItem onClick={() => this.onUserSelected(user.serial)} className="searchItem">{user.name} {_.includes(this.state.selected,user.serial) ? (<div className="pull-right"><i className="fa fa-check" aria-hidden="true"></i></div>) : ('')}</ListGroupItem>
		);
	}

	render(){

		var userList = null;

		if (this.props.loading){
			userList = <ListGroupItem> -- Loading -- </ListGroupItem>;
		}
		else{
			if (this.props.recipients.length == 0){
				userList = <ListGroupItem><i> -- No users found -- </i></ListGroupItem>;
			}
			else{
				userList = this.props.recipients.map(this.renderUser);
			}
		}


		return (
			<ListGroup>
				<ListGroupItem style={{background:'#394165',color:'#fff'}}>Users <div className="pull-right"><i title="Start search" onClick={this.startSearch} class="fa fa-search" aria-hidden="true"></i></div></ListGroupItem>
					{userList}
			</ListGroup>
		);
	}

}

function mapStateToProps(state){
	return { 
			recipients: state.search.recipients,
			loading: state.search.loadingRecipients
	};
}

export default connect(mapStateToProps,null)(RecipientList);