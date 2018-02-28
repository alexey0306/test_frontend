// Import section
import React,{Component} from 'react';

// Init section
const styles = {
	card: {
		boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
		transition: '0.3s',
	},
	header:{
		background: "#394165",
		padding: '10px 10px 10px 10px',
		color: "#fff"
	},
	container: {
		padding: '10px 10px 10px 10px'
	},
	footer:{
		padding: '10px 10px 10px 10px',
		borderTop: "1px solid #ddd"
	}

}

// Functions section
const GroupCard = (props) => {

	return (
		<div style={styles.card}>
			<div style={styles.header}>
				<i className="fa fa-users fa-2x"></i>
			</div>
			<div style={styles.container}>
				<h4>{props.group.name}</h4><br/>
				<p>{props.group.dscr}</p>
			</div>
		</div>
	);

}

export default GroupCard;
