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
				<li key={item.id} className="breadcrumb-item active">{item.name}</li>
			);
		}
		else{
			return (
				<li key={item.id} className="breadcrumb-item"><Link to={item.link}>{item.name}</Link></li>
			);
		}	
	}
	
	render(){
		const key = this.props.items.length + 1;
		return (
			<div>
				<ol className="breadcrumb">{this.props.items.map(this.renderItem)}
					{this.props.lastItem ? (
					<li key={key} className="breadcrumb-item">{this.props.lastItem.name}</li>
					) : (<span></span>)}
				</ol>
				
			</div>
		);
	}
}

export default Breadcrumb;