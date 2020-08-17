import React, { useState } from 'react';
import Field from './Field';
import './UserCredentials.css';

const UserCredentials = ({
  pageTitle,
  onFormSubmit,
  loadingState,
  logo,
  errors,
  children
} = {}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit({ email, password });
  };

  const renderHeader = () => {
    if (logo) {
      return (
        <h2 className="ui image header">
          <img
            src={logo.src}
            alt={logo.alt}
            className="image"
          />
          <div className="content">
            {pageTitle}
          </div>
        </h2>
      );
    }
    return (
      <h2 className="ui header">
        <div className="content">
          {pageTitle}
        </div>
      </h2>
    );
  };

  const renderErrors = () => {
    const result = errors.map((error) => {
      return (
        <li>{error.message}</li>
      );
    });
    if (result.length >= 1) {
      return (
        <React.Fragment>
          <div className="header">Error Occurred!</div>
          <ul className="list">
            {result}
          </ul>
        </React.Fragment>
      );
    }
    return null;
  };

  const renderChildren = () => {
    if (children) {
      return (
        <div className="ui message">
          {children}
        </div>
      );
    }
  };

  return (
    <div className="grid-container">
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          {renderHeader()}
          <form
            className={`ui large ${loadingState ? 'loading ' : ''}form error`}
            onSubmit={handleSubmit}
          >
            <div className="ui stacked segment">
              <Field
                label="Email"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={setEmail}
              >
                <i className="user icon"></i>
              </Field>
              <Field
                label="Password"
                type="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={setPassword}
              >
                <i className="lock icon"></i>
              </Field>
              <button className="ui fluid primary button" type="submit">Submit</button>
            </div>
            <div className="ui error message">
              {renderErrors()}
            </div>
          </form>
          {renderChildren()}
        </div>
      </div>
    </div>
  );
};

export default UserCredentials;
