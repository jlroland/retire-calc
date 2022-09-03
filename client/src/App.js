import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './css/App.css';
import Header from './components/header';
import Footer from './components/footer';
import Login from './components/login';
import QueryPage from './components/queryPage';
import About from './components/about';

function App() {
  return (
    <div className="App">
      <Header />
      <Footer />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/calculate' element={<QueryPage />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
