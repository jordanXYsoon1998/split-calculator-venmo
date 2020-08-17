import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import history from '../../history';
import splitbill from '../../apis/splitbill';
import { } from '../../actions';
import UserCredentials from '../pieces/UserCredentials';

const VenmoLogin = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  // TODO: Work on the Venmo and decide OTP
  const onFormSubmit = async ({ email, password }) => {
    setErrors([]);
    setLoading(true);
    try {
      await splitbill.post('/venmoUsers/login', { email, password });
      // dispatch(venmoLogin());
      history.push('/main-app');
    } catch (err) {
      setLoading(false);
      if (err.response.status === 401) {
        setErrors([...errors, { message: 'Incorrect email or password' }]);
      }
    }
  };

  const venmoLogo = {
    src: 'https://cdn1.venmo.com/marketing/images/branding/venmo-icon.svg',
    alt: 'Venmo Branded Logo'
  };

  return (
    <UserCredentials
      pageTitle="Login to Venmo"
      onFormSubmit={onFormSubmit}
      loadingState={loading}
      errors={errors}
      logo={venmoLogo}
    />
  );
};

export default VenmoLogin;
