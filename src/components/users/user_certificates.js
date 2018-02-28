// Import section
import React, {Component} from 'react';
import CertificateCard from '../certificates/certificate_card';

// Init section
const no_certs_found = <div><i> -- No certificates found -- </i></div>

// Component code
const UserCertificates = (props) => {

	return (
		<div>
			<h3>Certificates</h3><hr/>
			{ props.certificates.length == 0 ? (no_certs_found) 
				: (
					props.certificates.map(function(item){
						return <div className="cardBlock" onClick={() => {console.log(item.id)}}><CertificateCard certificate={item} /></div>
					})
				)} 
		</div>
	);

}

export default UserCertificates;