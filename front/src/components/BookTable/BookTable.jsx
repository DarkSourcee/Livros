import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente genérico de tabela para exibir dados.
 *
 * @param {Object} props
 * @param {Array} props.data - Array de objetos com os dados a serem exibidos na tabela.
 * @param {Array} props.columns - Array de objetos definindo as colunas da tabela.
 * @param {Function} [props.renderCell] - Função opcional para renderizar células individualmente.
 * @param {String} [props.emptyMessage] - Mensagem para exibir quando não houver dados.
 */
const GenericTable = ({ data, columns, renderCell, emptyMessage }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.label}</th>
            ))}
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
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center">{emptyMessage}</td>
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
};

GenericTable.defaultProps = {
  emptyMessage: 'Nenhum dado para exibir',
};

export default GenericTable;
