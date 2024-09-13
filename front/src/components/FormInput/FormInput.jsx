import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({ 
  label, 
  name, 
  id, 
  type = 'text', 
  value, 
  onChange, 
  required = false, 
  options = [] 
}) => {
  return (
    <div className="form-group mb-3">
      <label htmlFor={id}>{label}</label>
      {type === 'select' ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="form-control"
        >
          <option value="">Selecione</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          className="form-control"
        />
      )}
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  options: PropTypes.array
};

export default FormInput;