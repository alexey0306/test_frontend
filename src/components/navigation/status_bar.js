// Import section
import React,{Component} from 'react';

// Init section
const styles = {
	width:'100%',
	height:'100px',
	backgroundColor: '#394165',
	color: "#fff"
}

// Class section
class StatusBar extends Component{
	render(){
		return (
			<div style={styles}></div>
		);
	}
}

export default StatusBar;