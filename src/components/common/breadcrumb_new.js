import React,{Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class BreadcrumbNew extends Component{

	constructor(props){
		super(props);
	}

	renderItem(item){
		return (
			<li key={item.id}>{item.isLink == true ? (<a href={item.link}>{item.name}</a>) : (<span>{item.name}</span>)}</li>
		);
	}
	
	render(){
		console.log(this.props.lastItem);
		const key = this.props.items.length + 1;
		return (
			<div>
				<ul class="breadcrumb">
					{this.props.items.map(this.renderItem)}
					{this.props.lastItem ? (
					<li>{this.props.lastItem.name}</li>
					) : (<span></span>)}
				</ul>	
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		items: state.breadcrumbs.items,
		lastItem: state.breadcrumbs.lastItem
	};
}

export default connect(mapStateToProps,null)(BreadcrumbNew);