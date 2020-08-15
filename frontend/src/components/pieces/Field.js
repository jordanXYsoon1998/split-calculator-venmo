import React from 'react';

const Field = ({
  label,
  type = 'text',  // HTML input type
  name,
  placeholder,
  value,
  onChange,
  children        // Input icon
} = {}) => {

  const iconClassName = () => {
    if (children) {
      // Parent passed in an icon to render with the input
      return 'left icon ';
    }
    return '';
  };

  return (
    <div className="field">
      <label>{label}</label>
      <div className={`ui ${iconClassName()}input`}>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {children}
      </div>
    </div>
  );
};

export default Field;
