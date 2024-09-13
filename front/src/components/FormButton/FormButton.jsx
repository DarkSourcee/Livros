import React from 'react';

const FormButton = ({ label, type = 'button', onClick, icon }) => {
  return (
    <button
      type={type}
      className="btn btn-primary d-flex align-items-center"
      onClick={onClick}
    >
      {icon && <i className={`me-2 ${icon}`}></i>}
      {label}
    </button>
  );
};

export default FormButton;