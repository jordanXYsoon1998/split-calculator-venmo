import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import history from '../../history';
import splitbill from '../../apis/splitbill';
import { } from '../../actions';
import FormHeader from '../pieces/FormHeader';
import FormWrapper from '../pieces/FormWrapper';
import GridContainer from '../pieces/GridContainer';
import UserCredentials from '../pieces/UserCredentials';

const VenmoLogin = () => {
  // For the UserCredentials component
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // For the FormWrapper
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  // For the Venmo Otp Component
  const [showOtp, setShowOtp] = useState(false);
  const [otpSentTo, setOtpSentTo] = useState('');

  const dispatch = useDispatch();

  const onFormSubmit = async () => {
    setErrors([]);
    setLoading(true);
    try {
      const loginResponse = await splitbill.post('/venmoUsers/login', { email, password });
      const { otpReqSuccess, sentTo } = loginResponse.data;
      // Successful so we want to prompt the user for the received OTP
      setShowOtp(otpReqSuccess);
      setOtpSentTo(sentTo);
    } catch (err) {
      setLoading(false);
      if (err.response.status === 400) {
        setErrors([...errors, { message: 'Incorrect email or password' }]);
      }
    }
  };

  const venmoLogo = {
    src: 'https://cdn1.venmo.com/marketing/images/branding/venmo-icon.svg',
    alt: 'Venmo Branded Logo'
  };

  return (
    <GridContainer>
      <React.Fragment>
        <FormHeader title="Login to Venmo" logo={venmoLogo} />
        <FormWrapper
          loading={loading}
          errors={errors}
          onSubmit={onFormSubmit}
        >
          <UserCredentials
            {...{email, setEmail, password, setPassword}}
          />
        </FormWrapper>
      </React.Fragment>
    </GridContainer>
  );
};

export default VenmoLogin;
