import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookListPage from './pages/BookListPage';
import BookForm from './pages/BookForm';
import NavBar from './components/NavBar/NavBar';

const App = () => {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<BookListPage />} />
          <Route path="/add-book" element={<BookForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;