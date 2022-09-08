import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './css/App.css';
import Header from './components/header';
import Footer from './components/footer';
import Login from './components/loginForm';
import Calculator from './components/calculator';
import Queries from './components/savedQueries';
import NoQueries from './components/noQueries';
import About from './components/about';

class Apptest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: ''
    };
    this.loggingIn = this.loggingIn.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  loggingIn() {
    this.setState({isLoggedIn: true});
  }

  updateUser(user) {
    this.setState({username: user});
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={this.state.isLoggedIn ? <Calculator user={this.state.username} loggedIn={this.state.isLoggedIn}/> : <Login userUpdate={this.updateUser} submitLogin={this.loggingIn}/>} />
            <Route path='/calculate' element={<Calculator />} />
            <Route path='/queries' element={<NoQueries />} />
            <Route path='/queries/:user' element={<Queries />} />
            <Route path='/about' element={<About />} />
          </Routes>
          <Footer />
          </BrowserRouter>
      </div>
    );
  }
}

export default Apptest;