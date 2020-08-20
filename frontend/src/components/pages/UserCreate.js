import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../../history';
import splitbill from '../../apis/splitbill';
import { userLogin } from '../../actions';
import FormHeader from '../pieces/FormHeader';
import FormWrapper from '../pieces/FormWrapper';
import GridContainer from '../pieces/GridContainer';
import UserCredentials from '../pieces/UserCredentials';

const UserCreate = () => {
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

  const loginRedirect = () => {
    return (
      <div className="ui message">
        <p>
          Already have an account?&nbsp;
          <Link to="/login">Login here</Link>
        </p>
      </div>
    );
  };

  return (
    <GridContainer>
      <React.Fragment>
        <FormHeader title="Create Account" />
        <FormWrapper
          onSubmit={onFormSubmit}
          loading={loading}
          errors={errors}
        >
          <UserCredentials
            {...{email, setEmail, password, setPassword}}
          />
        </FormWrapper>
        {loginRedirect()}
      </React.Fragment>
    </GridContainer>
  );
};

export default UserCreate;
