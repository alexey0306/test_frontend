import { combineReducers } from 'redux';
import MenuReducer from './reducer_menu';
import UsersReducer from './reducer_users';
import GroupsReducer from './reducer_groups';
import AlertsReducer from './reducer_alerts';
import AccountsReducer from './reducer_accounts';
import { reducer as formReducer } from 'redux-form';
import NotebooksReducer from './reducer_notebooks';

const rootReducer = combineReducers({
  navigation: MenuReducer,
  users:UsersReducer,
  form: formReducer,
  groups: GroupsReducer,
  alerts: AlertsReducer,
  accounts: AccountsReducer,
  notebooks: NotebooksReducer
});

export default rootReducer;
