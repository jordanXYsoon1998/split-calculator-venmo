import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Landing from './pages/Landing';
import MainApp from './pages/MainApp';
import history from '../history';

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/main-app" component={MainApp} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
