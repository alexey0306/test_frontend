import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Breadcrumb from '../common/breadcrumb';
import {fetchUser} from '../../actions/users_actions';
import {Link} from 'react-router';

// Declaring the Input element IDs
const TXT_NAME_ID = "txtName";
const TXT_EMAIL_ID = "txtEmail";
var arrayVar = [];


class UsersInfo extends Component{

	constructor(props){
		super(props);
		this.state = {items: [{id:1,name:"Users",link: "/users",isLink:true}] }
		this.onChange = this.onChange.bind(this);
		this.generateDN = this.generateDN.bind(this);
	}

	componentWillMount(){
		this.props.fetchUser(this.props.params.id);		
	}
	

	generateDN(){
		var subjectDN = [];
		if (this.state.userName){
			subjectDN.push(`CN=${this.state.userName}`);
		}
		if (this.state.email){
			subjectDN.push(`E=${this.state.email}`);
		}
		this.setState({subject:subjectDN.join(",")});
	}

	renderGroup(group){
		return (
			<tr>
				<td>{group.name}</td>
				<td>{group.dscr}</td>
				<td>...</td>
			</tr>
		);
	}

	onChange(event){
		var elem = event.target;
		switch (elem.id){
			case TXT_NAME_ID:
				this.setState({userName:elem.value});
				break;
			case TXT_EMAIL_ID:
				this.setState({email:elem.value});
				break;
		}
	}

	render(){
		const items = [{id:1, name: "Users","link":"/users",isLink: true}]
		return (
			<div>
				<Breadcrumb items={items} lastItem={this.props.user}/>
			</div>
		);
	}

}

function mapStateToProps(state){
	return {user: state.users.user};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchUser},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(UsersInfo);