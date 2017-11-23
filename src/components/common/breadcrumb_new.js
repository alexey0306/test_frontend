import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setLastItem} from '../../actions/navigation_actions';
import {SERVICE_ONENOTE,SERVICE_EVERNOTE} from '../../globals/globals';
import {Link} from 'react-router';
class BreadcrumbNew extends Component{

	constructor(props){
		super(props);	
	}

	renderItem(item){
		return (
			<li key={item.id}>{item.isLink == true ? (<Link to={item.link}>{item.name}</Link>) : (<span>{item.name}</span>)}</li>
		);
	}
	
	render(){
		const key = this.props.items.length + 1;
		var className = "saferoom-default";
		switch (parseInt(this.props.service)){
			case SERVICE_EVERNOTE:
				className = "saferoom-evernote";
				break;
			case SERVICE_ONENOTE:
				className = "saferoom-onenote";
				break;
		}

		return (
			<div>
				<ul className={`breadcrumb ${className}`}>
					{this.props.items.map(this.renderItem)}
					{this.props.lastItem ? (
					<li key={key}>{this.props.lastItem.name}</li>
					) : (<span></span>)}
				</ul>	
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		items: state.breadcrumbs.items,
		lastItem: state.breadcrumbs.lastItem,
		active: state.notebooks.active
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({setLastItem},dispatch);
} 

export default connect(mapStateToProps,mapDispatchToProps)(BreadcrumbNew);