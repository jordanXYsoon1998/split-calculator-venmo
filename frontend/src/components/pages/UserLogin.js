import React from 'react';
import { Link } from 'react-router-dom';
import splitbill from '../../apis/splitbill';
import UserCredentials from '../pieces/UserCredentials';

const UserLogin = () => {
  const onFormSubmit = async ({ email, password }) => {
    try {
      const loginResponse = await splitbill.post('/users/login', { email, password });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <UserCredentials
      pageTitle="Login"
      onFormSubmit={onFormSubmit}
    >
      <p>
        New to us?&nbsp;
        <Link to="/user-create">Sign Up</Link>
      </p>
    </UserCredentials>
  );
};

export default UserLogin;
