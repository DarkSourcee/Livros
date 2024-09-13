import React, { useEffect, useState } from 'react';
import BookTable from '../components/BookTable/BookTable';
import { toast } from 'react-toastify'; // Importando toastify
import 'react-toastify/dist/ReactToastify.css'; // Importando estilos do toastify
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

  // Placeholder para funções de edição e exclusão
  const handleEdit = (item) => {
    console.log('Editar item:', item);
    // Adicione a lógica para editar o item
  };

  const handleDelete = async (item) => {
    if (window.confirm('Tem certeza de que deseja excluir este livro?')) {
      try {
        await axios.delete(`http://localhost:9999/api/books/${item.id}`);
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== item.id));
        toast.success(`Livro "${item.nome}" deletado com sucesso!`);
      } catch (error) {
        setError('Erro ao excluir o livro.');
        toast.error(`Erro ao deletar o livro: `+error);
      }
    }
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
          renderCell={formatCell} 
          emptyMessage="Nenhum livro encontrado" 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
};

export default BookListPage;
