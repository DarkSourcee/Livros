import React from 'react';
import PropTypes from 'prop-types';
import FormButton from '../FormButton/FormButton';

const GenericTable = ({
  data,
  columns,
  renderCell,
  emptyMessage = 'Nenhum dado para exibir',
  onEdit,
  onDelete
}) => {
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
                    {renderCell ? renderCell(item, col.key) : item[col.key] || 'N/A'}
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
    })
  ).isRequired,
  renderCell: PropTypes.func,
  emptyMessage: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default GenericTable;
