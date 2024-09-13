import React, { useState } from 'react';
import FormInput from '../components/FormInput/FormInput';
import FormButton from '../components/FormButton/FormButton';
import Barcode from 'react-barcode';

const generateRandomBarcode = () => {
  return Math.floor(1000000000000 + Math.random() * 9000000000000).toString();
};

const generateRandomDate = () => {
  const start = new Date(2000, 0, 1);
  const end = new Date();
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

const BookForm = () => {
  const [bookInfo, setBookInfo] = useState({
    name: '',
    author: '',
    releaseDate: '',
    releaseLocation: '',
    barcode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookInfo({
      ...bookInfo,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do livro:', bookInfo);
  };

  const generateData = () => {
    setBookInfo({
      barcode: generateRandomBarcode()
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
                  name="name"
                  id="name"
                  value={bookInfo.name}
                  onChange={handleChange}
                  required
                />
                <FormInput
                  label="Autor"
                  name="author"
                  id="author"
                  value={bookInfo.author}
                  onChange={handleChange}
                  required
                />
                <FormInput
                  label="Data de Lançamento"
                  name="releaseDate"
                  id="releaseDate"
                  type="date"
                  value={bookInfo.releaseDate}
                  onChange={handleChange}
                  required
                />
                <FormInput
                  label="Local de Lançamento"
                  name="releaseLocation"
                  id="releaseLocation"
                  value={bookInfo.releaseLocation}
                  onChange={handleChange}
                  required
                />
                <FormInput
                  label="Código de Barras"
                  name="barcode"
                  id="barcode"
                  value={bookInfo.barcode}
                  onChange={handleChange}
                  required
                />
                {/* Botão para gerar dados com ícone */}
                <button
                  type="button"
                  className="btn btn-primary mt-3 mb-4 d-flex align-items-center justify-content-center"
                  onClick={generateData}
                >
                  <i className="fas fa-random me-2"></i>
                  Gerar Dados
                </button>
                {/* Visualização do Código de Barras */}
                {bookInfo.barcode && (
                  <div className="mt-2 text-center">
                    <Barcode value={bookInfo.barcode} />
                  </div>
                )}
                <FormButton
                  label="Enviar"
                  type="submit"
                  icon="fas fa-paper-plane"
                  size="lg"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookForm;