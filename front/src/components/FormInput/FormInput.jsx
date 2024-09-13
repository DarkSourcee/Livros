import React from 'react';

const FormInput = ({ label, name, id, type = 'text', value, onChange, required = false }) => {
  return (
    <div>
      <label htmlFor={id} className="form-label">{label}:</label>
      <input
        type={type}
        id={id}
        name={name}
        className="form-control"
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default FormInput;