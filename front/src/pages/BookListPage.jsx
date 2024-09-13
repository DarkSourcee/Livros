import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Importar toast e ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importar o CSS do Toastify
import BookTable from '../components/BookTable/BookTable';
import confirmDelete from '../components/ConfirmDialog/ConfirmDialog'; // Importar confirmDelete

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Criar instância de navigate

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:9999/api/books');
        setBooks(response.data);
        setFilteredBooks(response.data); // Inicializa a lista filtrada
      } catch (error) {
        setError('Erro ao carregar os livros.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    // Função para filtrar livros com base no termo de busca
    const filterBooks = () => {
      if (searchTerm === '') {
        setFilteredBooks(books);
      } else {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const filtered = books.filter(book =>
          Object.values(book).some(value =>
            value.toString().toLowerCase().includes(lowercasedSearchTerm)
          )
        );
        setFilteredBooks(filtered);
      }
    };

    filterBooks();
  }, [searchTerm, books]);

  const columns = [
    { key: 'nome', label: 'Nome' },
    { key: 'autor', label: 'Autor' },
    { key: 'data_lancamento', label: 'Data de Lançamento' },
    { key: 'local_lancamento', label: 'Local de Lançamento' },
    { key: 'codigo_barras', label: 'Código de Barras' },
    { key: 'actions', label: 'Ações' }
  ];

  const handleEdit = (item) => {
    navigate(`/edit-book/${item.id}`); 
  };

  const handleDelete = (item) => {
    confirmDelete('Tem certeza que deseja excluir este livro?', async () => {
      try {
        await axios.delete(`http://localhost:9999/api/books/${item.id}`);
        setBooks(books.filter(book => book.id !== item.id));
        setFilteredBooks(filteredBooks.filter(book => book.id !== item.id));
        toast.success('Livro excluído com sucesso!');
      } catch (error) {
        toast.error('Erro ao excluir o livro.');
        console.error('Erro ao excluir o livro:', error);
      }
      toast.dismiss(); // Fechar o toast de confirmação após a exclusão
    });
  };

  const renderCell = (item, key) => {
    if (key === 'actions') {
      return (
        <div>
          <button onClick={() => handleEdit(item)} className="btn btn-outline-primary me-2">Editar</button>
          <button onClick={() => handleDelete(item)} className="btn btn-outline-danger">Excluir</button>
        </div>
      );
    }
    return item[key] || 'N/A';
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lista de Livros</h2>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por livro..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {loading ? (
        <div className="text-center">Carregando...</div>
      ) : error ? (
        <div className="text-center text-danger">{error}</div>
      ) : (
        <BookTable
          data={filteredBooks}
          columns={columns}
          renderCell={renderCell}
          emptyMessage="Nenhum livro encontrado"
        />
      )}
      <ToastContainer /> 
    </div>
  );
};

export default BookListPage;
