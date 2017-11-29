// Import section
import React,{Component} from 'react';

// Init section
const styles = {
	width:'100%',
	height:'150px',
	backgroundColor: '#394165',
	color: "#fff",
	paddingLeft: '16px',
	paddingTop:'20px'
}

// Class section
class StatusBar extends Component{
	render(){
		return (
			<div style={styles}>
				<div>
					<i className="fa fa-user-o fa-2x profile"></i>
				</div>
				<div style={{marginTop:'10px'}}>Alexey Zelenkin</div>
				<div style={{color: '#ccc'}}>alexey.zelenkin@gmail.com</div>
			</div>
		);
	}
}

export default StatusBar;