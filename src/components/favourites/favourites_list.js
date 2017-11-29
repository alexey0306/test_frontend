// Import section
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchFavourites} from '../../actions/notes_actions';
import {no_favourites_found} from '../../globals/globals';
import {Link} from 'react-router';
import {get_service_icon} from '../../globals/helpers';
import _ from 'lodash';

// Init section
const styles = {
	centered:{
		textAlign:'center'
	}
}

// Class section
class FavouritesList extends Component{

	constructor(props){
		super(props);
		this.state = {selected:[]}
		this.onFavSelect = this.onFavSelect.bind(this);
		this.onRowClick = this.onRowClick.bind(this);
		this.onAllChange = this.onAllChange.bind(this);
		this.renderFavourite = this.renderFavourite.bind(this);
	}

	onRowClick(event){
		var checked = event.currentTarget.querySelectorAll("input[type='checkbox']")[0].checked;
		var id = parseInt(event.currentTarget.id);
		this.selectFavourite(id,!checked);
		event.stopPropagation();
	}

	onFavSelect(event){
		event.stopPropagation();
		this.selectFavourite(event.target.id,event.target.checked);
	}

	onAllChange(event){
		var arrayVar = [];
		if (event.target.checked){
			this.props.favourites.map(function(user){
				arrayVar.push(user.id);
			})
		}
		this.setState({selected:arrayVar});
		this.props.onChange(arrayVar);
	}

	selectFavourite(id,checked){
		var arrayVar = this.state.selected;
		if (checked){arrayVar.push(parseInt(id));}
		else{
			arrayVar = arrayVar.filter(function(item){
				return item !== parseInt(id);
			});
		}
		this.setState({selected: arrayVar});
		this.props.onChange(arrayVar);
	}



	renderFavourite(item){
		var icon = "/images/"+get_service_icon(item.service)
		return (
			<tr onClick={this.onRowClick} id={item.id} key={item.id} className="selected">
				<td><input id={item.id} onClick={this.onFavSelect} checked={_.includes(this.state.selected,item.id)} type="checkbox"/></td>
				<td><img src={icon}/></td>
				<td><Link to={item.access_link}>{item.name}</Link></td>
			</tr>
		)
	}

	render(){
		return (<div>
			<table className="table table-hover table-striped">
					<thead>
						<tr>
							<th><input onChange={this.onAllChange} type="checkbox" id='selectAll'/></th>
							<th>Service</th>
							<th style={{width:'80%'}}>Title</th>							
						</tr>
					</thead>
					<tbody>
						{this.props.favourites.length == 0 ? no_favourites_found : this.props.favourites.map(this.renderFavourite)}
					</tbody>
				</table>
			</div>);
	}

	componentDidMount(){
		this.props.fetchFavourites();
	}

}

function mapStateToProps(state){
	return { favourites: state.notes.favourites };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchFavourites},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(FavouritesList);