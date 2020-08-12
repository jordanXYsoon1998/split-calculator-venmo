import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import history from '../history';
import Landing from './pages/Landing';
import MainApp from './pages/MainApp';
import UserLogin from './pages/UserLogin';
import UserSignUp from './pages/UserSignUp';
import VenmoLogin from './pages/VenmoLogin';

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/main-app" component={MainApp} />
          <Route path="/login" component={UserLogin} />
          <Route path="/sign-up" component={UserSignUp} />
          <Route path="/venmo-login" component={VenmoLogin} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
