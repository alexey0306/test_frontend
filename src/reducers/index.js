import { combineReducers } from 'redux';
import MenuReducer from './reducer_menu';
import UsersReducer from './reducer_users';
import GroupsReducer from './reducer_groups';
import AlertsReducer from './reducer_alerts';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  navigation: MenuReducer,
  users:UsersReducer,
  form: formReducer,
  groups: GroupsReducer,
  alerts: AlertsReducer  
});

export default rootReducer;
