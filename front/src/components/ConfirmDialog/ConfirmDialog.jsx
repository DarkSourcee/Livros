import React from 'react';
import { toast } from 'react-toastify';
import './ConfirmDialog.css'
import FormButton from '../FormButton/FormButton';

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div>
      <p>{message}</p>
      <div className='caixa'>
        <FormButton 
           onClick={onConfirm}
           classButton='btn btn-primary' 
           label='Confirmar'
           icon='fas fa-paper-plane'
        />

        <FormButton 
           onClick={onCancel}
           classButton='btn btn-danger' 
           label='Cancelar'
           icon='fa-solid fa-xmark'
        />

      </div>
    </div>
  );
};

const confirmDelete = (message, onConfirm) => {
  toast(<ConfirmDialog message={message} onConfirm={onConfirm} onCancel={() => toast.dismiss()} />, {
    autoClose: false,
    closeOnClick: false,
    draggable: false,
  });
};

export default confirmDelete;
export { ConfirmDialog };
