import React, { useState } from 'react';
import axios from 'axios'; // Importando axios
import { toast } from 'react-toastify'; // Importando toastify
import 'react-toastify/dist/ReactToastify.css'; // Importando estilos do toastify
import FormInput from '../components/FormInput/FormInput';
import FormButton from '../components/FormButton/FormButton';
import Barcode from 'react-barcode';

// Função para gerar um código de barras aleatório
const generateRandomBarcode = () => {
  return Math.floor(1000000000000 + Math.random() * 9000000000000).toString();
};

const BookForm = () => {
  const [bookInfo, setBookInfo] = useState({
    nome: '',
    autor: '',
    data_lancamento: '',
    local_lancamento: '',
    codigo_barras: ''
    // numero_edicao: 1
  });

  // Função para lidar com alterações nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookInfo({
      ...bookInfo,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Dados enviados:', bookInfo); // Adicione esta linha para ver o que está sendo enviado
      const response = await axios.post('http://localhost:9999/api/books', bookInfo);
      toast.success(`Livro "${response.data.nome}" salvo com sucesso!`);
      setBookInfo({
        nome: '',
        autor: '',
        data_lancamento: '',
        local_lancamento: '',
        codigo_barras: ''
        // numero_edicao: 1
      });
    } catch (error) {
      toast.error(`Erro: ${errorMessage}`);
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
              <h2 className="card-title mb-4 text-center">Cadastro de Livro</h2>
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
                  value={bookInfo.local_lancamento}
                  onChange={handleChange}
                  required
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
                    label="Enviar"
                    type="submit"
                    classButton="btn btn-outline-success mt-3 d-flex align-items-center justify-content-center"
                    icon="fas fa-paper-plane"
                  />

                  <FormButton
                    label="Cancelar"
                    type="button"
                    classButton="btn btn-outline-danger mt-3 d-flex align-items-center justify-content-center"
                    icon="fa-solid fa-xmark"
                    onClick={() => setBookInfo({
                      nome: '',
                      autor: '',
                      data_lancamento: '',
                      local_lancamento: '',
                      codigo_barras: ''
                    })}
                  />
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookForm;
