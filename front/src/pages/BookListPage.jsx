import React, { useEffect, useState } from 'react';
import BookTable from '../components/BookTable/BookTable';
// import axios from 'axios';

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     try {
  //       const response = await axios.get('https://api.example.com/books'); // Substitua pelo URL real da API
  //       setBooks(response.data);
  //     } catch (error) {
  //       setError('Erro ao carregar os livros.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBooks();
  // }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lista de Livros</h2>
      {loading ? (
        <div className="text-center">Carregando...</div>
      ) : error ? (
        <div className="text-center text-danger">{error}</div>
      ) : (
        <BookTable books={books} />
      )}
    </div>
  );
};

export default BookListPage;