/*
	Name: Navigation
	Purpose: This component is used to hold the navigation menu
	Created: 15.10.2017
	Author: Alexey Zelenkin
*/

// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchMenu} from '../../actions/menu_actions';
import {Link} from 'react-router';

class Navigation extends Component{

	renderItem(item){
		if (item.header){
			return (
				<h4 key={item.name}>{item.name}</h4>
			);
		}
		else{
			return (
				<Link key={item.name} to={`/${item.link}`}>
					<li  className="list-group-item">{item.name}</li>
				</Link>
			);
		}
	}

	componentWillMount(){
		this.props.fetchMenu();		
	}

	render(){
		return (
			<div>
				<ul className="list-group">
					{this.props.items.map(this.renderItem)}
				</ul>
				
			</div>
		);
	}

}

function mapStateToProps(state){
	return {items: state.navigation.items};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchMenu},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Navigation);