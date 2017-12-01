// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchTags} from '../../actions/search_actions';
import {Panel,ListGroup, ListGroupItem} from 'react-bootstrap';
import _ from 'lodash';

// Init section


// Class section
class TagList extends Component{

	constructor(props){
		super(props);
		this.state = {selected:[]}
		this.onTagSelected = this.onTagSelected.bind(this);
		this.renderTag = this.renderTag.bind(this);
		this.startSearch = this.startSearch.bind(this);
	}

	onTagSelected(guid){
		var newArray = this.state.selected.slice();
		if (_.includes(this.state.selected,guid)){
			newArray = newArray.filter(function(item){
				return item !== guid;
			});
		}
		else{
			newArray.push(guid);
		}
		this.setState({selected: newArray});
	}

	startSearch(){
		this.props.onStartSearch("tags",this.state.selected);
	}

	renderTag(tag){
		return (
			<ListGroupItem onClick={() => this.onTagSelected(tag.guid)} className="searchItem">{tag.name} {_.includes(this.state.selected,tag.guid) ? (<div className="pull-right"><i className="fa fa-check" aria-hidden="true"></i></div>) : ('')}</ListGroupItem>
		);
	}

	render(){

		if (this.props.tags.length == 0){
			return (
				<ListGroup>
					<ListGroupItem style={{background:'#394165',color:'#fff'}}>Tags </ListGroupItem>
					<ListGroupItem><i> -- No tags found -- </i></ListGroupItem>
				</ListGroup>
			);
		}
		
		return (
				<div style={{height:'300px',overflowY:'auto'}}>
				<ListGroup>
					<ListGroupItem style={{background:'#394165',color:'#fff'}}>Tags <div className="pull-right"><i title="Start search" onClick={this.startSearch} class="fa fa-search" aria-hidden="true"></i></div></ListGroupItem>
					{this.props.tags.map(this.renderTag)}
				</ListGroup>
				</div>
				
			);		
	}

}

function mapStateToProps(state){
	return { tags: state.search.tags };
}

export default connect(mapStateToProps,null)(TagList);