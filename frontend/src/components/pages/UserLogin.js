import React from 'react';
import UserCredentials from '../pieces/UserCredentials';

const UserLogin = () => {
  const onFormSubmit = ({ email, password }) => {
    console.log({
      email,
      password
    });
  };

  return (
    <UserCredentials
      pageTitle="Welcome to the Login Page!"
      onFormSubmit={onFormSubmit}
    />
  );
};

export default UserLogin;
