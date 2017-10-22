import React,{Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class Breadcrumb extends Component{

	constructor(props){
		super(props);
	}

	renderItem(item){
		if (!item.isLink){
			return (
				<li key={item.name} className="breadcrumb-item active">{item.name}</li>
			);
		}
		else{
			return (
				<li key={item.name} className="breadcrumb-item"><Link to={item.link}>{item.name}</Link></li>
			);
		}	
	}
	
	render(){
		return (
			<div>
				<ol className="breadcrumb">{this.props.items.map(this.renderItem)}
					{this.props.lastItem ? (
					<li className="breadcrumb-item">{this.props.lastItem.name}</li>
					) : (<span></span>)}
				</ol>
				
			</div>
		);
	}
}

export default Breadcrumb;