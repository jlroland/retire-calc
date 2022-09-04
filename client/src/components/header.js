import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  return (
    <div>
      <h1>How Much is Enough?</h1>
        <nav>
          <ul className='nav'>
            <li><a href='/'>Home</a></li>
            <li><a href='/calculate'>Calculate</a></li>
            <li><a href='/queries/'>Saved Scenarios</a></li>
            <li><a href='/about'>About</a></li>
          </ul> 
        </nav>  
    </div>
  )
}

export default Header;