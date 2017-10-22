import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Breadcrumb from '../common/breadcrumb';
import {fetchUser} from '../../actions/users_actions';
import {Link} from 'react-router';

// Declaring the Input element IDs
const TXT_NAME_ID = "txtName";
const TXT_EMAIL_ID = "txtEmail";


class UsersInfo extends Component{

	constructor(props){
		super(props);
		this.state = {
			items:[{name:"Users",link:"/users",isLink:true}],
			userName: "",
			email:"",
			subjectDN: ""
		};

		this.onChange = this.onChange.bind(this);
		this.generateDN = this.generateDN.bind(this);
	}

	componentWillMount(){

		// Getting specific user
		this.props.fetchUser(this.props.params.id).then((response) => {
			if (response.payload.status == 200){
				this.setState({name:this.props.user.name});
				this.setState({email:this.props.user.email});
				this.setState({subject:this.props.user.subject});
			}
		});
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
		return (

			<div>
			<Breadcrumb items={this.state.items} />

			<h3>General</h3><hr/>
			<form>
				<div className="form-group">
					<label htmlFor="txtName">Name:</label>
					<input
						required="true"
						id="txtName"
						onChange={this.onChange}
						onBlur={this.generateDN}
						type="text" 
						value={this.state.name}
						placeholder="Please specify username"
						className="form-control" />
				</div>
				<div className="form-group">
					<label htmlFor="txtEmail">Email:</label>
					<input
						onChange={this.onChange}
						onBlur={this.generateDN}
						id="txtEmail"
						type="email" 
						value={this.state.email}
						placeholder="Please specify email"
						className="form-control" />
				</div>
				<div className="form-group">
					<label htmlFor="txtSubject">Subject DN:</label>
					<input
						readOnly="true"
						id="txtSubject"
						type="text" 
						value={this.state.subject}
						placeholder="Subject DN is generated automatically"
						className="form-control" />
				</div>
				<div className="row">
					<div className="col-md-12">
						<button className="btn btn-primary">Update</button>
						<Link to="/users">
							<button className="btn btn-danger">Cancel</button>
						</Link>
					</div>
				</div>
			</form>
			<h3>Groups</h3><hr/>
			<table class="table table-striped">
				<thead>
				</thead>
				<tbody>
					{ this.props.user != null ? this.props.user.groups.map(this.renderGroup) : '' }
				</tbody>
			</table>
			
			<h3>Certificates</h3><hr/>
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