// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchSearches} from '../../actions/search_actions';
import {ListGroup,ListGroupItem} from 'react-bootstrap';

// Init section


// Class section
class SavedSearchList extends Component{

	constructor(props){
		super(props);
	}

	renderSearch(search){
		return (
			<ListGroupItem className="searchItem">{search.name}</ListGroupItem>
		);
	}

	render(){
		
		if (this.props.searches.length == 0){
			return (
				<ListGroup>
					<ListGroupItem style={{background:'#394165',color:'#fff'}}>Saved searches</ListGroupItem>
					<ListGroupItem><i> -- No searches found -- </i></ListGroupItem>
				</ListGroup>
			);
		}
		
		return (
				<div style={{height:'300px',overflowY:'auto'}}>
				<ListGroup>
					<ListGroupItem style={{background:'#394165',color:'#fff'}}>Saved searches</ListGroupItem>
					{this.props.searches.map(this.renderSearch)}
				</ListGroup>
				</div>
				
			);		
	}

}

function mapStateToProps(state){
	return { searches: state.search.searches };
}

export default connect(mapStateToProps,null)(SavedSearchList);