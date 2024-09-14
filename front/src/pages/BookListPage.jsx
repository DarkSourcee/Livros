import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import BookTable from '../components/BookTable/BookTable';
import confirmDelete from '../components/ConfirmDialog/ConfirmDialog'; 
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Barcode from 'react-barcode'; 
import FormButton from '../components/FormButton/FormButton';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [generatingPDF, setGeneratingPDF] = useState(false); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:9999/api/books');
        setBooks(response.data);
        setFilteredBooks(response.data);
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
    { key: 'data_lancamento', label: 'Data de Lançamento', isDate: true }, 
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
        toast.error('Erro ao excluir o livro.', error);
        console.error('Erro ao excluir o livro:', error);
      }
      toast.dismiss(); 
    });
  };

  const renderCell = (item, key) => {
    if (key === 'actions') {
      return (
        <div>
          <button 
            onClick={() => handleEdit(item)} 
            className={`btn btn-outline-primary me-2 ${generatingPDF ? 'hide-on-pdf' : ''}`}>
            Editar
          </button>
          <button 
            onClick={() => handleDelete(item)} 
            className={`btn btn-outline-danger ${generatingPDF ? 'hide-on-pdf' : ''}`}>
            Excluir
          </button>
        </div>
      );
    }
    if (key === 'codigo_barras') {
      return (
        <div style={{ width: '120px' }}>
          <Barcode value={item[key]} width={1} height={30} /> {/* Ajuste o tamanho conforme necessário */}
        </div>
      );
    }
    return item[key] || 'N/A';
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePrintPDF = () => {
    setGeneratingPDF(true); 
    const input = document.getElementById('book-list');
    html2canvas(input, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190; 
      const pageHeight = 295; 
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('books-list.pdf');
      setGeneratingPDF(false); 
    }).catch(error => {
      console.error('Erro ao gerar PDF:', error);
      setGeneratingPDF(false); 
    });
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredBooks, {
      header: columns.map(col => col.key),
      skipHeader: false
    });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Livros');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'books-list.xlsx');
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
      <div>
        <FormButton 
          onClick={handlePrintPDF}
          classButton='btn btn-primary mb-4'
          label='Gerar PDF'
          icon='fa fa-print'
        />
        <FormButton 
          onClick={handleExportExcel}
          classButton='btn btn-success mb-4 ms-2'
          label='Exportar Excel'
          icon='fa fa-file-excel'
        />
      </div>
      {loading ? (
        <div className="text-center">Carregando...</div>
      ) : error ? (
        <div className="text-center text-danger">{error}</div>
      ) : (
        <div id="book-list">
          <BookTable
            data={filteredBooks}
            columns={columns}
            renderCell={renderCell}
            emptyMessage="Nenhum livro encontrado"
          />
        </div>
      )}
      <ToastContainer /> 
    </div>
  );
};

export default BookListPage;
