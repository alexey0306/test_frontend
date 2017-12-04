// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchTags} from '../../actions/search_actions';
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
			<ListGroupItem key={tag.guid} onClick={() => this.onTagSelected(tag.guid)} className="searchItem">{tag.name} {_.includes(this.state.selected,tag.guid) ? (<div className="pull-right"><i className="fa fa-check" aria-hidden="true"></i></div>) : ('')}</ListGroupItem>
		);
	}

	render(){

		var tagList = null;
		var style = styles.none;

		if (this.props.loading){
			tagList = <ListGroupItem> -- Loading -- </ListGroupItem>;
		}
		else{
			if (this.props.tags.length == 0){
				tagList = <ListGroupItem><i> -- No tags found -- </i></ListGroupItem>;
			}
			else{
				tagList = this.props.tags.map(this.renderTag);
				style = styles.shown;
			}
		}


		return (
			<div>
				<div style={styles.header}> Tags <div className="pull-right">
					<i title="Start search" onClick={this.startSearch} className="fa fa-search" aria-hidden="true"></i></div>
				</div>
				<ListGroup style={style}>
					{tagList}
				</ListGroup>
			</div>
		);
	}

}

function mapStateToProps(state){
	return { 
		tags: state.search.tags,
		loading: state.search.tagsLoading
	};
}

export default connect(mapStateToProps,null)(TagList);