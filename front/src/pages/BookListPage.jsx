import React, { useEffect, useState } from 'react';
import BookTable from '../components/BookTable/BookTable';
import axios from 'axios';

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:9999/api/books'); // Substitua pelo URL real da API
        setBooks(response.data);
      } catch (error) {
        setError('Erro ao carregar os livros.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Defina as colunas da tabela
  const columns = [
    { key: 'nome', label: 'Nome' },
    { key: 'autor', label: 'Autor' },
    { key: 'data_lancamento', label: 'Data de Lançamento' },
    { key: 'local_lancamento', label: 'Local de Lançamento' },
    { key: 'codigo_barras', label: 'Código de Barras' }
  ];

  // Função opcional para formatar células
  const formatCell = (item, key) => {
    if (key === 'data_lancamento') {
      return new Date(item[key]).toLocaleDateString();
    }
    return item[key] || 'N/A';
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lista de Livros</h2>
      {loading ? (
        <div className="text-center">Carregando...</div>
      ) : error ? (
        <div className="text-center text-danger">{error}</div>
      ) : (
        <BookTable
          data={books}
          columns={columns}
          renderCell={formatCell} // Passa a função de formatação, se necessário
          emptyMessage="Nenhum livro encontrado" // Mensagem quando não houver dados
        />
      )}
    </div>
  );
};

export default BookListPage;