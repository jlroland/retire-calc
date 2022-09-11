import React from 'react';
//import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function Footer(props) {
  
  return (
      <div>
        <Navbar>
          <Container>
            <Nav>
              <Navbar.Text><p>&copy; 2022</p></Navbar.Text>
              <Nav.Link href='/'>Home</Nav.Link>
              {props.loggedIn ? <Nav.Link href={`/calculate/${props.user}`}>Calculator</Nav.Link> : <Nav.Link href='/calculate'>Calculator</Nav.Link>}
              {props.loggedIn ? <Nav.Link href={`/queries/${props.user}`}>Saved Scenarios</Nav.Link> : <Nav.Link href='/queries'>Saved Scenarios</Nav.Link>}
              <Nav.Link href='/about'>About</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
  )
}

export default Footer;