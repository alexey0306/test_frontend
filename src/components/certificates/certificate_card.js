// Import section
import React,{Component} from 'react';

// Init section
const styles = {
	card: {
		boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
		transition: '0.3s'
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
const CertificateCard = (props) => {

	return (
		<div style={styles.card}>
			<div style={styles.header}>
				<i className="fa fa-id-card-o fa-2x"></i>
			</div>
			<div style={styles.container}>
				<h4>{props.certificate.name}</h4><br/>
				<p>{props.certificate.serial}</p>
			</div>
			<div style={styles.footer}>
				<i>Created: {props.certificate.created}</i>
			</div>
		</div>
	);

}

export default CertificateCard;
