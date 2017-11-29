// Import section
import React, {Component} from 'react';
import FavouritesList from './favourites_list';
import FavouritesPanel from './favourites_panel';
import {displayBread} from '../../actions/navigation_actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Init section
const items = [{id:1, name:"Favourites", link:"/favourites",isLink:false}];

// Class section
class FavouritesIndex extends Component{
	constructor(props){
		super(props);
		this.state = {selected: []}
	}

	componentDidMount(){
		this.props.displayBread(items);
	}

	onFavouritesChange(selected){
		this.setState({selected});
	}

	render(){
		return (
			<div>
				<FavouritesPanel selected={this.state.selected} />
				<FavouritesList onChange={this.onFavouritesChange.bind(this)} />
			</div>
		);
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({displayBread},dispatch);
}

export default connect(null,mapDispatchToProps)(FavouritesIndex);
