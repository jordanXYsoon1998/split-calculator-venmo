import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div>
      <h2>Welcome to the Landing Page!</h2>
      <Link to="/main-app" className="ui primary button">Get Started</Link>
    </div>
  );
};

export default Landing;
