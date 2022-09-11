import React from 'react';
//import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Logout from './logout';

function Header(props) {
  
  return (
    <div>
      <Navbar>
        <Container>
          <Nav>
            <Nav.Link href='/'>Home</Nav.Link>
            {props.loggedIn ? <Nav.Link href={`/calculate/${props.user}`}>Calculator</Nav.Link> : <Nav.Link href='/calculate'>Calculator</Nav.Link>}
            {props.loggedIn ? <Nav.Link href={`/queries/${props.user}`}>Saved Scenarios</Nav.Link> : <Nav.Link href='/queries'>Saved Scenarios</Nav.Link>}
            <Nav.Link href='/about'>About</Nav.Link>
          </Nav>
          {props.loggedIn && <Navbar.Text><Logout user={props.user}/></Navbar.Text>}
        </Container>
      </Navbar>
      <h1>How Much is Enough?</h1>
    </div>
  )
}

export default Header;