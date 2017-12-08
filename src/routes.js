import {Route,IndexRoute} from 'react-router';
import React from 'react';
import App from './components/app';
import Welcome from './components/common/welcome';
import UsersIndex from './components/users/users_index';
import UsersInfo from './components/users/users_info';
import GroupsList from './components/groups/groups_list';
import GroupInfo from './components/groups/group_info';
import AccountsList from './components/accounts/accounts_list';
import NotebooksList from './components/notebooks/notebooks_list';
import NotesList from './components/notes/notes_list';
import NotesInfo from './components/notes/notes_info';
import PoliciesList from './components/policies/policies_list';
import PolicyInfo from './components/policies/policy_info';
import TasksIndex from './components/tasks/tasks_index.js';
import CreateNote from './components/notes/create_note';
import CertificatesIndex from './components/certificates/certificates_index';
import ThumbnailContainer from './components/common/thumbnail';
import SectionsIndex from './components/sections/sections_index';
import FavouritesIndex from './components/favourites/favourites_index';
import BatchCreateIndex from './components/batch/batch_create_index';
import SearchIndex from './components/search/search_index';
import LoginIndex from './components/login/login_index';


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
		<Route path="policies" component={PoliciesList}></Route>
		<Route path="policies/:pid" component={PolicyInfo}></Route>
		<Route path="tasks" component={TasksIndex}></Route>
		<Route path="create" component={CreateNote}></Route>
		<Route path="certificates" component={CertificatesIndex}></Route>
		<Route path="sections/:id/list/:notebook_name/:notebook_guid" component={SectionsIndex}></Route>
		<Route path="thumb" component={ThumbnailContainer}></Route>
		<Route path="favourites" component={FavouritesIndex}></Route>
		<Route path="batch_create" component={BatchCreateIndex}></Route>
		<Route path="search" component={SearchIndex}></Route>
		<Route path="login" component={LoginIndex}></Route>
	</Route>
);
