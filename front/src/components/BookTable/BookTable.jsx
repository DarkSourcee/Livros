import React from 'react';
import PropTypes from 'prop-types';

const BookTable = ({ books }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Autor</th>
            <th>Data de Lançamento</th>
            <th>Local de Lançamento</th>
            <th>Código de Barras</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book, index) => (
              <tr key={index}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.releaseDate}</td>
                <td>{book.releaseLocation}</td>
                <td>{book.barcode}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">Nenhum livro para exibir</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

BookTable.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired,
      releaseLocation: PropTypes.string.isRequired,
      barcode: PropTypes.string.isRequired
    })
  ).isRequired,
};

export default BookTable;