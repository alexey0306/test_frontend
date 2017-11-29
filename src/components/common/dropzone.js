// Import section
import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import {get_icon} from '../../globals/helpers';

// Init section

// Class section
class DropzoneArea extends Component{

	constructor(props){
		super(props);
		this.state = {files:[]}
	}

	onDrop(files){
		this.setState({files});
		this.props.onDropped(files);
	}

	render(){
		return (
			<div className="section">
				<Dropzone className="dropzone" onDrop={this.onDrop.bind(this)}>
					<h4>Try dropping some files here, or click to select files to upload</h4>
          		</Dropzone>
          		<ul className="list-group">
          			{
          				this.state.files.map(f => 
          					<li class="list-group-item" key={f.name}> <img style={{marginRight:'10px'}} src={`images/${get_icon(f.type)}`}/> {f.name} ({f.size} bytes)</li>)
          			}
          		</ul>          		
          	</div>
		);
	}
}

export default DropzoneArea;