import React from 'react';
import PropTypes from 'prop-types';
import FormButton from '../FormButton/FormButton';
import { format } from 'date-fns'; // Ou moment, conforme sua escolha

const formatDate = (date) => {
  try {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      throw new Error('Data inválida');
    }
    return format(parsedDate, 'dd/MM/yyyy'); // Ou 'DD/MM/YYYY' se usar moment
  } catch (e) {
    console.error('Erro ao formatar a data:', e);
    return date;
  }
};

const GenericTable = ({
  data,
  columns,
  renderCell,
  emptyMessage = 'Nenhum dado para exibir',
  onEdit,
  onDelete
}) => {
  const renderCellWithFormat = (item, key) => {
    const value = renderCell ? renderCell(item, key) : item[key] || 'N/A';
    // Verifique se a coluna é de data e formate-a
    if (columns.find(col => col.key === key)?.isDate) {
      return formatDate(value);
    }
    return value;
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.label}</th>
            ))}
            {(onEdit || onDelete) && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>
                    {renderCellWithFormat(item, col.key)}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td>
                    {onEdit && (
                      <FormButton
                        label="Editar"
                        onClick={() => onEdit(item)}
                        icon="fa-solid fa-pen-to-square"
                        classButton="btn btn-warning"
                        size="sm"
                      />
                    )}
                    {onDelete && (
                      <FormButton
                        label="Excluir"
                        onClick={() => onDelete(item)}
                        icon="fa-solid fa-xmark"
                        classButton="btn btn-danger"
                        size="sm"
                      />
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="text-center">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

GenericTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      isDate: PropTypes.bool // Adicione um campo para indicar se a coluna é de data
    })
  ).isRequired,
  renderCell: PropTypes.func,
  emptyMessage: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default GenericTable;
