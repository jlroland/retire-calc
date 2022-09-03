import React from 'react';


function Header() {
  return (
    <div>
      <h1>How Much is Enough?</h1>
        <ul className='nav'>
          <li><a href='/'>Home</a></li>
          <li><a href='/calculate'>Calculate</a></li>
          <li><a href='/about'>About</a></li>
        </ul>   
    </div>
  )
}

export default Header;