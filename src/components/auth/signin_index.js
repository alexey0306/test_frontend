// Import section
import React,{Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
import {reduxForm, Field,reset} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authenticate} from '../../actions/auth_actions';
import {renderField,textAreaField} from '../../globals/render_fields';

// Init section
const styles = {
	header:{
		height:'150px',
		background: '#394165'
	},
	content:{
		border: '1px solid #ddd',
		padding:'20px 20px 20px 20px'
	},
	button:{
		background: '#394165'
	}
}

// Class section
class SigninIndex extends Component{


	onSubmit(props){
		this.props.authenticate(props);
	}

	render(){

		const { handleSubmit, pristine, reset, submitting } = this.props;
		return (
			<form>
				<div style={styles.signin}>
					<div style={styles.header}></div>
				</div>
				<div style={styles.content}>
					<Field placeholder="Specify email to login" name="email" type="text" component={renderField} label="Email"></Field>
					<Field placeholder="Specify password" name="password" type="password" component={renderField} label="Password"></Field>
					<div className="form-group">
						<button style={styles.button} onClick={handleSubmit(this.onSubmit.bind(this))} className="btn btn-primary" type="submit">Sign In</button>
					</div>
				</div>
			</form>			
		);
	}
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('SigninForm'));

function validate(values){
	const errors = {};

	if (!values.email) {
		errors.email = 'Required'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    	errors.email = 'Invalid email address'
  	}
  	if (!values.password){
		errors.password = "Required";
	}
	return errors;
}


SigninIndex = reduxForm({
		form:'SigninForm',
		validate,
		onSubmitSuccess: afterSubmit,

})(SigninIndex);

function mapDispatchToProps(dispatch){
	return bindActionCreators({authenticate},dispatch);
}

SigninIndex = connect(null, mapDispatchToProps)(SigninIndex);
export default SigninIndex;