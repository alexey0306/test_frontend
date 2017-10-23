import {Route,IndexRoute} from 'react-router';
import React from 'react';
import App from './components/app';
import Welcome from './components/common/welcome';
import UsersList from './components/users/users_list';
import UsersInfo from './components/users/users_info';
import GroupsList from './components/groups/groups_list';
import GroupInfo from './components/groups/group_info';
import AccountsList from './components/accounts/accounts_list';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Welcome}/>
		<Route path="users" component={UsersList}></Route>
		<Route path="users/:id" component={UsersInfo}></Route>
		<Route path="groups" component={GroupsList}></Route>
		<Route path="groups/:id" component={GroupInfo}></Route>
		<Route path="accounts" component={AccountsList}></Route>
	</Route>
);