import React from 'react';

/**
 * FormWrapper is a Component that takes in form elements and wraps them in a form tag.
 *  It also defines a section below the form for any errors to be displayed
 */
const FormWrapper = ({ loading, errors, onSubmit, children }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  const formClassName = () => {
    return `ui large ${loading ? 'loading ' : ''}form error`
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

  return (
    <form
      className={formClassName()}
      onSubmit={handleSubmit}
    >
      <div className="ui stacked segment">
        {children}
      </div>
      <div className="ui error message">
        {renderErrors()}
      </div>
    </form>
  );
};

export default FormWrapper;
