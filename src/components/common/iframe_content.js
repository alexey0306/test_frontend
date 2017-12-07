// Import section
import React,{Component} from 'react';

// Init section
const styles = {
	iframe:{
		width:'100%',
		height:'800px',
		borderStyle:'none'
	}
}

// Class section
class ContentIFrame extends Component{

	constructor(props){
		super(props);
		this._updateIframe = this._updateIframe.bind(this);
	}

	componentDidMount(){
		this._updateIframe();
	}

	componentDidUpdate() {
        this._updateIframe();
    }

    _updateIframe(){

    	const iframe = this.refs.iframe;
    	const document = iframe.contentDocument;
    	const head = document.getElementsByTagName('head')[0];
    	if (this.props.content){
    		document.body.innerHTML = this.props.content;
    	}
    	else{
    		document.body.innerHTML = "Loading data ...";
    	}
    	
   	}

	render(){
		return (
			<iframe style={styles.iframe} ref="iframe"/>
		);
	}

}

export default ContentIFrame;
