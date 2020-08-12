import React from 'react';
import { Link } from 'react-router-dom';

const MainApp = () => {
  return (
    <React.Fragment>
      <h2>Welcome to the Actual App page!</h2>
      <Link to="/" className="ui button">Return to Landing Page</Link>
    </React.Fragment>
  );
};

export default MainApp;
