import React, {Component} from 'react';

class NotebooksDropdown extends Component {

	constructor(props){
		super(props);
		this.onChange = this.onChange.bind(this);
		this.renderNotebook = this.renderNotebook.bind(this);
	}

	onChange(event){
		this.props.onChange(event.target.value,event.target.options[event.target.selectedIndex].text);
	}

	renderNotebook(notebook){
		return (
			<option key={notebook.guid} value={notebook.guid}>{notebook.name}</option>
		);
	}

	render(){
		return (
			<select onChange={this.onChange} className="form-control" value={this.props.guid || ""}>
				<option value=""> -- Select notebook -- </option>
				{this.props.notebooks.length != 0 ? this.props.notebooks.map(this.renderNotebook) : ''}
			</select>
		);
	}
}

export default NotebooksDropdown;