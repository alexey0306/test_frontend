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
					<div style={{paddingLeft:'30px'}} className="headerItem">
						<div style={{display:'inline'}}><i onClick={this.onBarsClick} className="fa fa-bars fa-2x" aria-hidden="true"></i></div>
						{/*<div style={{display:'inline',marginLeft:'30px'}}><img style={{width:'auto', maxHeight:'40px'}} src='/images/logo_text_inverted.png' /></div> */}
						<div style={{display:'inline',marginRight:'30px'}} className="pull-right">
							<i title="User profile" className="fa fa-user fa-2x custom-icon"></i>
							<i title="Get help" className="fa fa-question fa-2x custom-icon"></i>
							<i title="Log out" className="fa fa-sign-out fa-2x custom-icon"></i>
						</div>
					</div>					
				</div>
			</div>			
		);
	}
}