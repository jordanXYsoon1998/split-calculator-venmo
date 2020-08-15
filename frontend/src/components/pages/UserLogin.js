import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import splitbill from '../../apis/splitbill';
import history from '../../history';
import UserCredentials from '../pieces/UserCredentials';

const UserLogin = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const onFormSubmit = async ({ email, password }) => {
    setLoading(true);
    try {
      await splitbill.post('/users/login', { email, password });
      history.push('/main-app');
    } catch (err) {
      setLoading(false);
      if (err.response.status === 401) {
        setErrors([...errors, { message: 'Incorrect email or password' }]);
      }
    }
  };

  return (
    <UserCredentials
      pageTitle="Login"
      onFormSubmit={onFormSubmit}
      loadingState={loading}
      errors={errors}
    >
      <p>
        New to us?&nbsp;
        <Link to="/user-create">Sign Up</Link>
      </p>
    </UserCredentials>
  );
};

export default UserLogin;
