// Import section
import React,{Component} from 'react';

// Init section

// Class section
class SearchBar extends Component{
	constructor(props){
		super(props);
		this.state = {term:""}
	}

	onChange(event){
		this.setState({term:event.target.value});
	}

	onSearchClick(event){
		event.preventDefault();
		this.props.onSearch(this.state.term);
	}

	render(){
		return (
			<form onSubmit={this.onSearchClick.bind(this)}>
				<div className="input-group">
					<input value={this.state.term} type="text" onChange={this.onChange.bind(this)} className="form-control searchBar" placeholder="Type the words to search"/>
					<span className="input-group-btn">					
						<button type="submit" className="btn btn-default" title="Search">
							<i className="fa fa-search" aria-hidden="true"></i>
						</button>
					</span>
				</div>
			</form>
		);
	}
}

export default SearchBar;