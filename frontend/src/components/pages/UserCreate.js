import React from 'react';
import { Link } from 'react-router-dom';
import UserCredentials from '../pieces/UserCredentials';

const UserCreate = () => {
  const onFormSubmit = ({ email, password }) => {
    console.log({
      email,
      password
    });
  };
  return (
    <UserCredentials
      pageTitle="Create Account"
      onFormSubmit={onFormSubmit}
    >
      <p>
        Already have an account?&nbsp;
        <Link to="/login">Login here</Link>
      </p>
    </UserCredentials>
  );
};

export default UserCreate;
