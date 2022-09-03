import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import './css/App.css';
//import Queries from './components/savedQueries';
//import Login from './components/login';
import Calculator from './components/calculator';

function App() {
  return (
    <div className="App">
      <Header />
      <Calculator />
      <Footer />
    </div>
  );
}

export default App;
