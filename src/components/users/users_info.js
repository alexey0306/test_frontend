import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUser} from '../../actions/users_actions';
import {displayBread,setLastItem} from '../../actions/navigation_actions';

//// Importing additional components
import UserCertificates from './user_certificates';
import UserGroups from './user_groups';
import Spinner from '../common/spinner';

// Declaring the Input element IDs
const TXT_NAME_ID = "txtName";
const TXT_EMAIL_ID = "txtEmail";
const items = [{id:1, name: "Users","link":"/users",isLink: true}]


class UsersInfo extends Component{

	constructor(props){
		super(props);
		this.state = {
			items: [{id:1,name:"Users",link: "/users",isLink:true}],
			name: "",
			email: "",
			subjectDN: ""
		}
		this.onChange = this.onChange.bind(this);
		this.generateDN = this.generateDN.bind(this);
	}

	componentWillReceiveProps(newProps){
		if (this.props.user != newProps.user){
			this.setState({
				name: newProps.user.name,
				email: newProps.user.email,
				subjectDN: newProps.user.subject
			})
		}
	}


	componentDidMount(){
		this.props.displayBread(items);
		this.props.fetchUser(this.props.params.uid);		
	}

	componentWillUnmount(){
		this.props.setLastItem(null);
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

		if (this.props.user == null){
			return (<Spinner />)
		}
		else{

			return (
				<div>
					<h3>General</h3><hr/>
					<div className="form-group" >
						<label>Name</label>
						<input
							value={this.state.name}
							type="text" 
							className="form-control" 
							placeholder="Type user's name" />					
					</div>
					<div className="form-group" >
						<label>Email</label>
						<input
							value={this.state.email} 
							type="text" 
							className="form-control" 
							placeholder="Type user's email" />					
					</div>
					<div className="form-group" >
						<label>Subject DN</label>
						<input
							value={this.state.subjectDN} 
							type="text" 
							className="form-control" 
							readOnly="true" />					
					</div><br/>
					<UserCertificates certificates={this.props.user.certificates} /><br/>
					<UserGroups groups={this.props.user.groups} />
				</div>
			);
		}
	}

}

function mapStateToProps(state){
	return {user: state.users.user};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchUser,displayBread,setLastItem},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(UsersInfo);