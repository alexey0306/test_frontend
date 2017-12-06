import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {displayBread,setLastItem} from '../../actions/navigation_actions';
import SectionsList from './sections_list';
import SectionsPanel from './sections_panel';

class SectionsIndex extends Component{

	constructor(props){
		super(props);
		this.state = {selected:[]}
	}

	componentDidMount(){
		//this.props.fetchNotes(this.props.params.id,this.props.params.guid);
		const items = [{id:1, name: "Notebooks" , link: `/notebooks/${this.props.params.id}/list`, isLink: true}]
		this.props.displayBread(items);
		this.props.setLastItem({data: {name:this.props.params.notebook_name,guid:this.props.params.notebook_guid}});
	}

	componentWillUnmount(){
		this.props.setLastItem(null);
	}

	render(){
		return (
			<div>
				<SectionsPanel selected={this.state.selected} account={this.props.params.id} notebook={this.props.params.notebook_guid} />
				<SectionsList onChange={(selected) => this.setState({selected}) } notebook={this.props.params.notebook_name} id={this.props.params.id} guid={this.props.params.notebook_guid} />
			</div>
		);	
	}

}

function mapDispatchToProps(dispatch){
	return bindActionCreators({displayBread,setLastItem},dispatch);
}

export default connect(null,mapDispatchToProps)(SectionsIndex);