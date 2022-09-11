import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
//import "bootstrap/dist/js/bootstrap.bundle.min";
import './css/App.css';
import Header from './components/header';
import Footer from './components/footer';
import Login from './components/loginForm';
import Welcome from './components/welcome';
import Calculator from './components/calculator';
import Queries from './components/savedQueries';
import NoQueries from './components/noQueries';
import About from './components/about';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: sessionStorage.getItem('isLoggedIn') || false,
      username: sessionStorage.getItem('username') || ''
    };
    this.loggingIn = this.loggingIn.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  loggingIn() {
    this.setState({isLoggedIn: true});
    sessionStorage.setItem('isLoggedIn', true);
  }

  updateUser(user) {
    this.setState({username: user});
    sessionStorage.setItem('username', user);
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Header loggedIn={this.state.isLoggedIn} user={this.state.username}/>
          <Routes>
            <Route path='/' element={this.state.isLoggedIn ? <Welcome user={this.state.username} /> : <Login userUpdate={this.updateUser} submitLogin={this.loggingIn}/>} />
            <Route path='/calculate' element={<Calculator />} />
            <Route path='/calculate/:user' element={<Calculator user={this.state.username}/>} />
            <Route path='/queries' element={<NoQueries />} />
            <Route path='/queries/:user' element={<Queries user={this.state.username}/>} />
            <Route path='/about' element={<About />} />
          </Routes>
          <Footer loggedIn={this.state.isLoggedIn} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;