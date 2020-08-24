import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import history from '../../history';
import splitbill from '../../apis/splitbill';
import { userLoginState, venmoLoginState } from '../../actions';
import FormHeader from '../pieces/FormHeader';
import FormWrapper from '../pieces/FormWrapper';
import GridContainer from '../pieces/GridContainer';
import UserCredentials from '../pieces/UserCredentials';
import VenmoOtpSubmit from '../pieces/VenmoOtpSubmit';

const VenmoLogin = () => {
  // For the UserCredentials component
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // For the FormWrapper
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  // For the Venmo Otp Component
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSentTo, setOtpSentTo] = useState('');

  const dispatch = useDispatch();

  const onCredentialFormSubmit = async () => {
    setErrors([]);
    setLoading(true);
    try {
      const loginResponse = await splitbill.post('/venmoUsers/login', { email, password });
      setLoading(false);
      const { otpReqSuccess, sentTo } = loginResponse.data;
      // Successful so we want to prompt the user for the received OTP
      setShowOtp(otpReqSuccess);
      setOtpSentTo(sentTo);
    } catch (err) {
      setLoading(false);
      if (err.response.status === 400) {
        setErrors([...errors, { message: err.response.data.error.message }]);
      }
    }
  };

  const onOtpFormSubmit = async () => {
    setErrors([]);
    setLoading(true);
    try {
      const otpResponse = await splitbill.post('/venmoUsers/login/otp', { otp });
      dispatch(userLoginState());
      dispatch(venmoLoginState());
      history.push('/main-app');
    } catch (err) {
      setLoading(false);
      if (err.response.status === 400) {
        setErrors([...errors, { message: err.response.data.error.message }]);
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
          onSubmit={showOtp ? onOtpFormSubmit : onCredentialFormSubmit}
        >
          {showOtp ? (
            <VenmoOtpSubmit
              {...{otp, setOtp, otpSentTo}}
            />
          ) : (
            <UserCredentials
              {...{email, setEmail, password, setPassword}}
            />
          )}
        </FormWrapper>
      </React.Fragment>
    </GridContainer>
  );
};

export default VenmoLogin;
