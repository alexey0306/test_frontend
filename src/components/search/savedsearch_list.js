// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchRecipients} from '../../actions/search_actions';
import {Panel,ListGroup, ListGroupItem} from 'react-bootstrap';
import _ from 'lodash';

// Init section
const styles = {
	none:{

	},
	shown:{
		maxHeight:'300px',
		overflowY:'auto'
	},
	header: {
		background:'#394165',
		color:'#fff',
		height:'40px',
		padding:'10px',
		paddingLeft:'20px',
	}
}


// Class section
class SavedSearchList extends Component{

	constructor(props){
		super(props);
		this.onSearchSelected = this.onSearchSelected.bind(this);
		this.renderSearch = this.renderSearch.bind(this);
		this.state = {selected: []}
		this.startSearch = this.startSearch.bind(this);
	}

	onSearchSelected(search){
		var newArray = [search];
		this.setState({selected:newArray});		
	}

	startSearch(){
		this.props.onStartSearch("searches",this.state.selected);
	}

	renderSearch(search){
		return (
			<ListGroupItem key={search.guid} onClick={() => this.onSearchSelected(search.query)} className="searchItem">{search.name} {_.includes(this.state.selected,search.query) ? (<div className="pull-right"><i className="fa fa-check" aria-hidden="true"></i></div>) : ('')}</ListGroupItem>
		);
	}

	render(){

		var searchList = null;
		var style = styles.none;

		if (this.props.loading){
			searchList = <ListGroupItem> -- Loading -- </ListGroupItem>;
		}
		else{
			if (this.props.searches.length == 0){
				searchList = <ListGroupItem><i> -- No Saved searches found -- </i></ListGroupItem>;
			}
			else{
				searchList = this.props.searches.map(this.renderSearch);
				style = styles.shown;
			}
		}


		return (
			<div>
				<div style={styles.header}> Saved searches <div className="pull-right">
					<i title="Start search" onClick={this.startSearch} className="fa fa-search" aria-hidden="true"></i></div>
				</div>
				<ListGroup style={style}>
					{searchList}
				</ListGroup>
			</div>
		);
	}

}

function mapStateToProps(state){
	return { 
			searches: state.search.searches,
			loading: state.search.loadingSearches
	};
}

export default connect(mapStateToProps,null)(SavedSearchList);