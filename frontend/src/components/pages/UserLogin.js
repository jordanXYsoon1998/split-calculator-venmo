import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../../history';
import splitbill from '../../apis/splitbill';
import { userLogin } from '../../actions';
import UserCredentials from '../pieces/UserCredentials';

const UserLogin = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const onFormSubmit = async ({ email, password }) => {
    setErrors([]);
    setLoading(true);
    try {
      await splitbill.post('/users/login', { email, password });
      dispatch(userLogin());
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
