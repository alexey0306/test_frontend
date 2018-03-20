import {Route,IndexRoute} from 'react-router';
import React from 'react';
import App from './components/app';
import Welcome from './components/common/welcome';

// User components
import UsersIndex from './components/users/users_index';
import UsersInfo from './components/users/users_info';

// Group components
import GroupsList from './components/groups/groups_list';
import GroupInfo from './components/groups/group_info';

// Account components
import AccountsList from './components/accounts/accounts_list';

// Notebook components
import NotebooksList from './components/notebooks/notebooks_list';

// Importing note components
import NotesList from './components/notes/notes_list';
import NotesInfo from './components/notes/notes_info';
import NotesEdit from './components/notes/notes_edit';

// Policies components
import PoliciesList from './components/policies/policies_list';
import PolicyInfo from './components/policies/policy_info';

import CreateNote from './components/notes/create_note';
import CertificatesIndex from './components/certificates/certificates_index';
import ThumbnailContainer from './components/common/thumbnail';
import SectionsIndex from './components/sections/sections_index';
import FavouritesIndex from './components/favourites/favourites_index';
import BatchCreateIndex from './components/batch/batch_create_index';
import SearchIndex from './components/search/search_index';



export default (
	<Route path="/" component={App} >
		<IndexRoute component={Welcome}/>
		<Route path="users" component={UsersIndex}></Route>
		<Route path="users/:uid" component={UsersInfo}></Route>
		<Route path="groups" component={GroupsList}></Route>
		<Route path="groups/:gid" component={GroupInfo}></Route>
		<Route path="accounts" component={AccountsList}></Route>
		<Route path="notebooks/:id/list" component={NotebooksList}></Route>
		<Route path="notes/:id/list/:notebook_name/:container_id" component={NotesList}></Route>
		<Route path="notes/:id/list/:notebook_name/:notebook_guid/:section_name/:container_id" component={NotesList}></Route>
		<Route path="notes/:id/:notebook_name/:notebook_guid/:guid" component={NotesInfo} />
		<Route path="notes/:id/:notebook_name/:notebook_guid/:section_name/:section_guid/:guid" component={NotesInfo} />
		<Route path="notes/:id/edit/:guid" component={NotesEdit} />
		<Route path="policies" component={PoliciesList}></Route>
		<Route path="policies/:pid" component={PolicyInfo}></Route>
		<Route path="create" component={CreateNote}></Route>
		<Route path="certificates" component={CertificatesIndex}></Route>
		<Route path="sections/:id/list/:notebook_name/:notebook_guid" component={SectionsIndex}></Route>
		<Route path="thumb" component={ThumbnailContainer}></Route>
		<Route path="favourites" component={FavouritesIndex}></Route>
		<Route path="batch_create" component={BatchCreateIndex}></Route>
		<Route path="search" component={SearchIndex}></Route>
	</Route>
);
