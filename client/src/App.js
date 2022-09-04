import React from 'react';
import { Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './css/App.css';
import Header from './components/header';
import Footer from './components/footer';
import Login from './components/login';
import Calculator from './components/calculator';
import Queries from './components/savedQueries';
import About from './components/about';

function App() {
  return (
    <div className="App">
      <Header />
      <Footer />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/calculate' element={<Calculator />} />
        <Route path='/queries/:user' element={<Queries />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
