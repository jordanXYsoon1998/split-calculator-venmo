import React from 'react';
import UserCredentials from '../pieces/UserCredentials';

const UserSignUp = () => {
  const onFormSubmit = ({ email, password }) => {
    console.log({
      email,
      password
    });
  };
  return (
    <UserCredentials
      pageTitle="Welcome to the Signup Page!"
      onFormSubmit={onFormSubmit}
    />
  );
};

export default UserSignUp;
