import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../../history';
import splitbill from '../../apis/splitbill';
import { userLogin } from '../../actions';
import UserCredentials from '../pieces/UserCredentials';

const UserCreate = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const onFormSubmit = async ({ email, password }) => {
    setLoading(true);
    try {
      await splitbill.post('/users', { email, password });
      dispatch(userLogin());
      history.push('/main-app');
    } catch (err) {
      setLoading(false);
      if (err.response.status === 400) {
        setErrors([...errors, { message: err.response.data.error.message }]);
      }
    }
  };

  return (
    <UserCredentials
      pageTitle="Create Account"
      onFormSubmit={onFormSubmit}
      loadingState={loading}
      errors={errors}
    >
      <p>
        Already have an account?&nbsp;
        <Link to="/login">Login here</Link>
      </p>
    </UserCredentials>
  );
};

export default UserCreate;
