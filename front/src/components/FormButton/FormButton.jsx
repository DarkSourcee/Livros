import React from 'react';

const FormButton = ({ label, type = 'button', onClick, icon, classButton = '', size = '' }) => {
  const buttonClass = `${classButton} ${size ? `btn-${size}` : ''}`.trim();

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
    >
      {icon && <i className={`me-2 ${icon}`}></i>}
      {label}
    </button>
  );
};

export default FormButton;
