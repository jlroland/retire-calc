import React from 'react';
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Logout from './logout';

function Header(props) {
  
  return (
    <div>
      <h1>How Much is Enough?</h1>
        <nav>
          <NavLink to='/'>Home</NavLink>
          {props.loggedIn ? <NavLink to={`/calculate/${props.user}`}>Calculator</NavLink> : <NavLink to='/calculate'>Calculator</NavLink>}
          {props.loggedIn ? <NavLink to={`/queries/${props.user}`}>Saved Scenarios</NavLink> : <NavLink to='/queries'>Saved Scenarios</NavLink>}
          <NavLink to='/about'>About</NavLink>
        </nav> 
      {props.loggedIn && <Logout user={props.user}/>}
    </div>
  )
}

export default Header;