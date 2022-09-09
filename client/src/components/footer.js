import React from 'react';
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer(props) {
  
  return (
      <div>
        <p>&copy; 2022</p>
        <nav>
          <NavLink to='/'>Home</NavLink>
          {props.loggedIn ? <NavLink to={`/calculate/${props.user}`}>Calculator</NavLink> : <NavLink to='/calculate'>Calculator</NavLink>}
          {props.loggedIn ? <NavLink to={`/queries/${props.user}`}>Saved Scenarios</NavLink> : <NavLink to='/queries'>Saved Scenarios</NavLink>}
          <NavLink to='/about'>About</NavLink>
        </nav>
      </div>
  )
}

export default Footer;