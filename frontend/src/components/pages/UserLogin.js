import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../../history';
import splitbill from '../../apis/splitbill';
import { userLoginState } from '../../actions';
import FormHeader from '../pieces/FormHeader';
import FormWrapper from '../pieces/FormWrapper';
import GridContainer from '../pieces/GridContainer';
import UserCredentials from '../pieces/UserCredentials';

const UserLogin = () => {
  // For the UserCredentials component
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // For the FormWrapper
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const onFormSubmit = async () => {
    setErrors([]);
    setLoading(true);
    try {
      await splitbill.post('/users/login', { email, password });
      dispatch(userLoginState());
      history.push('/main-app');
    } catch (err) {
      setLoading(false);
      if (err.response.status === 401) {
        setErrors([...errors, { message: 'Incorrect email or password' }]);
      }
    }
  };

  const signupRedirect = () => {
    return (
      <div className="ui message">
        <p>
          New to us?&nbsp;
          <Link to="/user-create">Sign Up</Link>
        </p>
      </div>
    );
  };

  return (
    <GridContainer>
      <React.Fragment>
        <FormHeader title="Login" />
        <FormWrapper
          onSubmit={onFormSubmit}
          loading={loading}
          errors={errors}
        >
          <UserCredentials
            {...{email, setEmail, password, setPassword}}
          />
        </FormWrapper>
        {signupRedirect()}
      </React.Fragment>
    </GridContainer>
  );
};

export default UserLogin;
