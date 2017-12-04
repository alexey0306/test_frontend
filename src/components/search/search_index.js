// Import section
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchAccounts} from '../../actions/accounts_actions';
import Breadcrumb from '../common/breadcrumb';
import {displayBread} from '../../actions/navigation_actions';
import {fetchTags,fetchSearches,fetchRecipients,searchNotes,clearAll} from '../../actions/search_actions';
import {fetchNotebooks} from '../../actions/notebooks_actions';
import NotesSearch from './search_results';
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
		this.state = {account:""}
		this.onTagSelected = this.onTagSelected.bind(this);
		this.onUserSelected = this.onUserSelected.bind(this);
		this.onSearchSelected = this.onSearchSelected.bind(this);
	}

	componentDidMount(){
		this.props.displayBread(items);
		this.props.fetchAccounts();
		this.props.clearAll();
	}

	onTagSelected(type,tags){
		this.searchNotes(type,tags);
	}

	onUserSelected(type,serials){
		this.searchNotes(type,serials);
	}

	onSearchSelected(type,queries){
		this.searchNotes(type,queries);
	}

	searchNotes(type,items){
		
		// Checking
		if (this.state.account == ""){
			alert("Account not selected");
			return false;
		}

		// Checking items
	    if (items.length == 0){
	    	alert("Search items not specified");
			return false;	
	    }

	    // Sending request
	    this.props.searchNotes({account:this.state.account,type:type,items:items});

	}

	onAccountSelect(account){
		if (account != ""){
			this.setState({account})
			this.props.fetchTags(account);
			this.props.fetchSearches(account);
			this.props.fetchRecipients();
			this.props.fetchNotebooks(account);
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
									<SavedSearchList onStartSearch={this.onSearchSelected} />
								</div>
							</div>
						</div>
						<div className="col-md-9" style={{paddingLeft:'30px'}}>
							<NotesSearch account={this.state.account} notebooks={this.props.notebooks} />							
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
		users: state.search.recipients,
		notebooks: state.notebooks.all
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		displayBread,fetchAccounts,fetchTags,
		fetchSearches,fetchRecipients,searchNotes,clearAll,fetchNotebooks},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchIndex);