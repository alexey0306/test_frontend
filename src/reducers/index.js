import { combineReducers } from 'redux';
import MenuReducer from './reducer_menu';
import UsersReducer from './reducer_users';
import GroupsReducer from './reducer_groups';
import AlertsReducer from './reducer_alerts';
import AccountsReducer from './reducer_accounts';
import { reducer as formReducer } from 'redux-form';
import NotebooksReducer from './reducer_notebooks';
import NotesReducer from './reducer_notes.js';
import PoliciesReducer from './reducer_policies';
import TasksReducer from './reducer_tasks';
import CertificatesReducer from './reducer_certificates';
import NavigationReducer from './reducer_navigation';
import SectionsReducer from './reducer_sections';
import GlobalsReducer from './reducer_globals';

const rootReducer = (state, action) => {
  return appReducer(state,action);
}

const appReducer = combineReducers({
  navigation: MenuReducer,
  users:UsersReducer,
  form: formReducer,
  groups: GroupsReducer,
  alerts: AlertsReducer,
  accounts: AccountsReducer,
  notebooks: NotebooksReducer,
  notes: NotesReducer,
  policies: PoliciesReducer,
  tasks: TasksReducer,
  certificates: CertificatesReducer,
  breadcrumbs: NavigationReducer,
  sections: SectionsReducer,
  globals: GlobalsReducer
});

export default rootReducer;
