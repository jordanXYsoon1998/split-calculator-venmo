import React from 'react';
import Field from './Field';

const UserCredentials = ({ email, setEmail, password, setPassword }) => {

  return (
    <React.Fragment>
      <Field
        label="Email"
        name="email"
        placeholder="Enter email"
        value={email}
        onChange={setEmail}
      >
        <i className="user icon" />
      </Field>
      <Field
        label="Password"
        type="password"
        name="password"
        placeholder="Enter password"
        value={password}
        onChange={setPassword}
      >
        <i className="lock icon" />
      </Field>
      <button className="ui fluid primary button" type="submit">Submit</button>
    </React.Fragment>
  );
};

export default UserCredentials;
