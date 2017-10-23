// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field,reduxForm} from 'redux-form';
import {bindActionCreators} from 'redux';
import {fetchGroup,updateGroup} from '../../actions/groups_actions';
import _ from 'lodash';
import {Link} from 'react-router';
import Breadcrumb from '../common/breadcrumb';
import {renderField, textAreaField} from '../../globals/render_fields';
import {groupValidate} from '../../globals/validate';
import GroupUserList from './group_userlist';


class GroupInfo extends Component {
	constructor(props){
		super(props);
	}

	onSubmit(props){
		this.props.updateGroup(props);
	}

	componentDidMount(){
		this.props.fetchGroup(this.props.params.id);
		//this.props.initialize({ name: this.props.group.name })
	}

	render(){
		const { handleSubmit, pristine, reset, submitting } = this.props;
		const items = [{id:1, name: "Groups","link":"/groups",isLink: true}]
		return (
			<div>
				<Breadcrumb items={items} lastItem={this.props.group}/>
				<form>
					<h3>General</h3><hr/>
					<div className="col-md-9">
					<Field name="name" type="text" label="Name" component={renderField}></Field>
					<Field name="dscr" label="Description" component={textAreaField}></Field>
					<div>
						<button onClick={handleSubmit(this.onSubmit.bind(this))} type="submit" className="btn btn-primary">Apply</button>
					</div>
					<h3>Users</h3><hr/>
						<GroupUserList group_id={this.props.group.id} users={this.props.group.users} />
					</div>
					
				</form>
			</div>
		);
	}
}


function mapStateToProps(state){
	return { 
		group: state.groups.group,
		initialValues: state.groups.group
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchGroup,updateGroup},dispatch);
}

GroupInfo = reduxForm({
	form:'UpdateGroupForm',
	groupValidate,
	enableReinitialize:true

})(GroupInfo);
GroupInfo = connect(mapStateToProps, mapDispatchToProps)(GroupInfo);
export default GroupInfo;