import React, {Component} from 'react';
import {Navbar, NavItem, Nav} from 'react-bootstrap';

export default class Header extends Component{

	constructor(props){
		super(props);
		this.onBarsClick = this.onBarsClick.bind(this);
	}

	onBarsClick(){
		this.props.onBarsClicked();
	}

	render(){
		return (
			<div>
				<div className="header">
					<div style={{paddingLeft:'20px'}} className="headerItem">
						<i onClick={this.onBarsClick} className="fa fa-bars fa-2x" aria-hidden="true"></i>
					</div>					
				</div>
			</div>			
		);
	}
}