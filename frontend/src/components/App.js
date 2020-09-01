import React from 'react';
import {
  Router,
  Route,
  Switch
} from 'react-router-dom';

import history from '../history';
import Landing from './pages/Landing';
import MainApp from './pages/MainApp';
import UserLogin from './pages/UserLogin';
import UserCreate from './pages/UserCreate';
import VenmoLogin from './pages/VenmoLogin';
import FriendList from './pieces/Friend/List';
import BillSplitMain from './pieces/BillSplit/Main';

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/main-app" component={MainApp} />
        <Route path="/login" component={UserLogin} />
        <Route path="/user-create" component={UserCreate} />
        <Route path="/venmo-login" component={VenmoLogin} />
        <Route path="/venmo-friends" component={FriendList} />
        <Route path="/bill-split-main" component={BillSplitMain} />
      </Switch>
    </Router>
  );
};

export default App;
