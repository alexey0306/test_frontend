import React, { Component } from 'react';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles 
import axios from 'axios';
import {insert_node} from '../../globals/helpers';
import {ROOT_URL} from '../../actions/index';
 
// Import bootstrap(v3 or v4) dependencies
import 'bootstrap/js/modal';
import 'bootstrap/js/dropdown';
import 'bootstrap/js/tooltip';
import 'bootstrap/dist/css/bootstrap.css';
 
class NoteEditor extends Component {

  constructor(props){
    super(props);
    this.state = {content: ""};
    this.addFile = this.addFile.bind(this);
    this.onChange = this.onChange.bind(this);
    this.uploadFile  = this.uploadFile.bind(this);
  }

  componentWillReceiveProps(newProps){
    this.setState({content: newProps.content});
  }

  onChange(content) {
    this.setState({content: content});
    this.props.onChange(content);
  }

  clear(){
    ReactSummernote.reset();
  }

  addFile(){
    this.fileUpload.click();
    //var node = document.createElement('p');
    //node.setAttribute("id","saferoomAttach");
    //node.innerHTML = "<strong>Some text</strong>";
    //ReactSummernote.insertNode(node);
  }

  uploadFile(event){
    
    const URL = `${ROOT_URL}upload/attach`;
    // Constructing a list of files to upload
    var files = event.target.files;
    var formData = new FormData();
    for (var i=0;i<files.length;i++){
      formData.append("attach[]",files[i]);
    }

    // Sending files to the server
    axios.post(URL,formData,{headers:{'Content-Type': 'multipart/form-data'}})
    .then((response) => {      
      var data = response.data;
      data.map(function(item){
        ReactSummernote.insertNode(insert_node(item));
      })

    })
    .catch((err) => {
      console.log(err);
    })


  }
 
  render() {
    return (
      <div>
      <ReactSummernote
        value={this.state.content}
        options={{
          lang: 'ru-RU',
          height: 350,
          dialogsInBody: true,
          toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['fontname', ['fontname']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link']],
            ['view', ['fullscreen', 'codeview']]
          ]
        }}
        onChange={this.onChange}
      />
      <div>
        <button onClick={this.addFile} className="btn btn-default">Add file</button>
        <button onClick={this.clear} className="btn btn-default">Clear</button>
        <input multiple="true" onChange={this.uploadFile} type="file" ref={input => this.fileUpload = input} style={{display:'none'}}/>
      </div>
      </div>
    );
  }
}
 
export default NoteEditor;