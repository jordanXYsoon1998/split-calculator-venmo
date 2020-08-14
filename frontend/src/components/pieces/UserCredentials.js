import React, { useState } from 'react';
import Field from './Field';

const UserCredentials = ({ pageTitle, onFormSubmit } = {}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit({ email, password });
  };

  return (
    <div>
      <h2>{pageTitle}</h2>
      <form className="ui form" onSubmit={handleSubmit}>
        <Field
          label="Email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={setEmail}
        />
        <Field
          label="Password"
          type="password"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={setPassword}
        />
        <button className="ui primary button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserCredentials;
