// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchAccounts} from '../../actions/accounts_actions';
import Breadcrumb from '../common/breadcrumb';
import {displayBread} from '../../actions/navigation_actions';
import {fetchTags,fetchSearches,fetchRecipients} from '../../actions/search_actions';
import NotesSearch from '../notes/notes_search';
import AccountsDropdown from '../accounts/accounts_dropdown';
import TagList from './tag_list';
import SavedSearchList from './savedsearch_list';
import RecipientsList from './recipient_list.js';

// Init section
const items = [{id:1, name: "Search","link":"/search",isLink: false}]

// Class section
class SearchIndex extends Component{

	constructor(props){
		super(props);
		this.onTagSelected = this.onTagSelected.bind(this);
		this.onUserSelected = this.onUserSelected.bind(this);
	}

	componentDidMount(){
		this.props.displayBread(items);
		this.props.fetchAccounts();		
	}

	onTagSelected(type,tags){
		this.searchNotes(type,tags);
	}

	onUserSelected(type,serials){
		this.searchNotes(type,serials);
	}

	searchNotes(type,items){
		console.log(type);
		console.log(items);
	}

	onAccountSelect(account){
		if (account != ""){
			this.props.fetchTags(account);
			this.props.fetchSearches(account);
			this.props.fetchRecipients();
		}
	}

	render(){
		
		return (
				<div>
					<div className="form-group">
						<label>Select account</label>
						<AccountsDropdown onChange={this.onAccountSelect.bind(this)} accounts={this.props.accounts} />
					</div>
					<div className="row">
						<div className="col-md-3">
							<br/>
							<div className="row">
								<div className="col-md-12">
									<RecipientsList onStartSearch={this.onUserSelected} />
								</div>
							</div>
							<br/>
							<div className="row">
								<div className="col-md-12">
									<TagList onStartSearch={this.onTagSelected} />
								</div>
							</div>
							<br/>
							<div className="row">
								<div className="col-md-12">
									<SavedSearchList />
								</div>
							</div>
						</div>
						<div className="col-md-9">
							<NotesSearch />
							
						</div>
					</div>
				</div>				
			);		
	}

}

function mapStateToProps(state){
	return { 
		accounts: state.accounts.all,
		tags: state.search.tags,
		searches: state.search.searches,
		users: state.search.recipients
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		displayBread,fetchAccounts,fetchTags,
		fetchSearches,fetchRecipients},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchIndex);