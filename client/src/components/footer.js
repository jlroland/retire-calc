import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
      <nav>
        <ul className='nav'>
          <li>&copy; 2022</li>
          <li><a href='/'>Home</a></li>
          <li><a href='/calculate'>Calculate</a></li>
          <li><a href='/queries/'>Saved Scenarios</a></li>
          <li><a href='/about'>About</a></li>
        </ul>
      </nav>
  )
}

export default Footer;