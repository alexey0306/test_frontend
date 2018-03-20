// Import section
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Modal,ListGroup, ListGroupItem} from 'react-bootstrap';

//// Importing additional components
import Spinner from '../common/spinner';

// Init section
const styles = {
	item: {
		margin: '20px',
		padding: '10px',
		borderBottom: '1px solid #ddd'
	}
}

// Class section
class NotebooksListModal extends Component{

	constructor(props){
		super(props);
		this.renderNotebook = this.renderNotebook.bind(this);
	}

	selectNotebook(notebook){
		this.props.onHide();
		this.props.onNotebookSelected(notebook);
	}


	renderNotebook(notebook){
		return (
			<ListGroupItem onClick={() => this.selectNotebook(notebook) } key={notebook.guid} className="notebookItem"><i className="fa fa-book" style={{marginRight:'10px'}}></i>  {notebook.name}</ListGroupItem>
		);
	}

	render(){
		return (
			<Modal {...this.props} bsSize="medium" aria-labelledby="contained-modal-title-lg">
				<Modal.Body className="modalBody bodyModal">
					{ this.props.notebooks.length == 0 ? <Spinner /> : (
						<ListGroup>
							{this.props.notebooks.map(this.renderNotebook)}
						</ListGroup>
					) }
					
				</Modal.Body>
				<Modal.Footer>
					<button className="btn btn-danger" onClick={this.props.onHide}>Close</button>
				</Modal.Footer>
			</Modal>
		);
	}
}

function mapStateToProps(state){
	return { notebooks: state.notebooks.all };
}

export default connect(mapStateToProps,null)(NotebooksListModal);