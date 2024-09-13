import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormInput from '../components/FormInput/FormInput';
import FormButton from '../components/FormButton/FormButton';
import Barcode from 'react-barcode';

// Função para gerar um código de barras aleatório
const generateRandomBarcode = () => {
  return Math.floor(1000000000000 + Math.random() * 9000000000000).toString();
};

const BookEditPage = () => {
  const { id } = useParams(); // Obtém o ID do livro da URL
  const navigate = useNavigate(); // Para navegação após o envio do formulário

  const [bookInfo, setBookInfo] = useState({
    nome: '',
    autor: '',
    data_lancamento: '',
    local_lancamento: '',
    codigo_barras: '',
    numero_edicao: 1
  });
  const [estados, setEstados] = useState([]);
  const [loadingEstados, setLoadingEstados] = useState(true);
  const [loadingBook, setLoadingBook] = useState(true); // Adicione o estado de carregamento do livro
  const [error, setError] = useState(null);

  // Função para buscar os estados da API
  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        setEstados(response.data.map((estado) => ({
          value: estado.sigla,
          label: estado.nome
        })));
      } catch (error) {
        setError('Erro ao carregar estados.');
        console.error(error);
      } finally {
        setLoadingEstados(false);
      }
    };

    fetchEstados();
  }, []);

  // Função para carregar os dados do livro
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/api/books/${id}`);
        console.log('Dados do livro:', response.data); // Verifique se os dados estão corretos
        setBookInfo(response.data);
      } catch (error) {
        setError('Erro ao carregar dados do livro.');
        console.error(error);
      } finally {
        setLoadingBook(false); // Atualize o estado de carregamento
      }
    };

    fetchBook();
  }, [id]);

  // Função para lidar com alterações nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookInfo({
      ...bookInfo,
      [name]: value
    });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Dados enviados:', bookInfo); // Adicione esta linha para ver o que está sendo enviado
      const response = await axios.put(`http://localhost:9999/api/books/${id}`, bookInfo);
      toast.success(`Livro "${response.data.nome}" atualizado com sucesso!`);
    //   navigate('/books'); // Navega de volta para a lista de livros após o sucesso
    } catch (error) {
      toast.error(`Erro: ${error.response ? error.response.data : error.message}`);
      console.error('Erro:', error.response ? error.response.data : error.message);
    }
  };

  // Função para gerar dados aleatórios para o formulário
  const generateData = () => {
    setBookInfo({
      ...bookInfo,
      codigo_barras: generateRandomBarcode()
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7">
          <div className="card p-4 shadow-lg">
            <div className="card-body">
              <h2 className="card-title mb-4 text-center">Editar Livro</h2>
              {loadingEstados ? (
                <div className="text-center">Carregando estados...</div>
              ) : loadingBook ? (
                <div className="text-center">Carregando dados do livro...</div>
              ) : error ? (
                <div className="text-center text-danger">{error}</div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <FormInput
                    label="Nome"
                    name="nome"
                    id="name"
                    value={bookInfo.nome}
                    onChange={handleChange}
                    required
                  />
                  <FormInput
                    label="Autor"
                    name="autor"
                    id="author"
                    value={bookInfo.autor}
                    onChange={handleChange}
                    required
                  />
                  <FormInput
                    label="Data de Lançamento"
                    name="data_lancamento"
                    id="releaseDate"
                    type="date"
                    value={bookInfo.data_lancamento}
                    onChange={handleChange}
                    required
                  />
                  <FormInput
                    label="Local de Lançamento"
                    name="local_lancamento"
                    id="releaseLocation"
                    type="select"
                    value={bookInfo.local_lancamento}
                    onChange={handleChange}
                    required
                    options={estados}
                  />
                  <FormInput
                    label="Código de Barras"
                    name="codigo_barras"
                    id="barcode"
                    value={bookInfo.codigo_barras}
                    onChange={handleChange}
                    required
                  />
                  
                  <FormButton
                    label="Gerar Dados"
                    type="button"
                    classButton="btn btn-outline-primary mt-3 mb-4 d-flex align-items-center justify-content-center"
                    icon="fas fa-random me-2"
                    onClick={generateData}
                  />
                  
                  {/* Visualização do Código de Barras */}
                  {bookInfo.codigo_barras && (
                    <div className="mt-2 text-center">
                      <Barcode value={bookInfo.codigo_barras} />
                    </div>
                  )}

                  <div className='d-flex justify-content-center gap-2 mt-3'>
                    <FormButton
                      label="Salvar"
                      type="submit"
                      classButton="btn btn-outline-success mt-3 d-flex align-items-center justify-content-center"
                      icon="fas fa-save"
                    />

                    <FormButton
                      label="Cancelar"
                      type="button"
                      classButton="btn btn-outline-danger mt-3 d-flex align-items-center justify-content-center"
                      icon="fa-solid fa-xmark"
                      onClick={() => navigate('/books')}
                    />
                  </div>
                  
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookEditPage;
