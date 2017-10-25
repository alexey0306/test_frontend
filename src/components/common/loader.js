import React,{Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Spinner from './spinner';
import {isLoading} from '../../actions/alerts_actions';


class Loader extends Component{

	componentDidMount(){
		this.props.isLoading(false);
	}

	render(){
		return (
		<Modal dialogClassName="loaderModal" show={this.props.loading} aria-labelledby="contained-modal-title-lg">
			<Modal.Body className="modalBody">
				<h3 className="inline"> <img className="loader" src="/images/loader.gif" /> Loading data .. </h3>
			</Modal.Body>
		</Modal>
		);
	}

}

function mapDispatchToProps(dispatch){
	return bindActionCreators({isLoading},dispatch);
} 
function mapStateToProps(state){
	return { loading: state.alerts.loading };
}
export default connect(mapStateToProps,mapDispatchToProps)(Loader);