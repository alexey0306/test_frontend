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
import TasksList from './components/tasks/tasks_list.js';
import CreateNote from './components/notes/create_note';
import CertificatesIndex from './components/certificates/certificates_index';
import ThumbnailContainer from './components/common/thumbnail';
export default (
	<Route path="/" component={App}>
		<IndexRoute component={Welcome}/>
		<Route path="users" component={UsersIndex}></Route>
		<Route path="users/:id" component={UsersInfo}></Route>
		<Route path="groups" component={GroupsList}></Route>
		<Route path="groups/:id" component={GroupInfo}></Route>
		<Route path="accounts" component={AccountsList}></Route>
		<Route path="notebooks/list/:id" component={NotebooksList}></Route>
		<Route path="notes/:id/list/:guid/:name" component={NotesList}></Route>
		<Route path="notes/:id/:notebook/:name/:guid" component={NotesInfo} />
		<Route path="policies" component={PoliciesList}></Route>
		<Route path="policies/:id" component={PolicyInfo}></Route>
		<Route path="tasks" component={TasksList}></Route>
		<Route path="create" component={CreateNote}></Route>
		<Route path="certificates" component={CertificatesIndex}></Route>
		<Route path="thumb" component={ThumbnailContainer}></Route>
	</Route>
);