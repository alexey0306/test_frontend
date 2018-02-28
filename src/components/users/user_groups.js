// Import section
import React, {Component} from 'react';
import GroupCard from '../groups/group_card';

// Init section
const no_groups_found = <div><i> -- No groups found -- </i></div>

// Component code
const UserGroups = (props) => {

	return (
		<div>
			<h3>Groups</h3><hr/>
			{ props.groups.length == 0 ? (no_groups_found) 
				: (
					props.groups.map(function(item){
						return <div className="cardBlock"><GroupCard group={item} /></div>
					})
				)} 
		</div>
	);

}

export default UserGroups;