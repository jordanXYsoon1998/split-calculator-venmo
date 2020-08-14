import React from 'react';

const Field = ({
  label,
  type = 'text',  // HTML input type
  name,
  placeholder,
  value,
  onChange
} = {}) => {
  return (
    <div className="field">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Field;
