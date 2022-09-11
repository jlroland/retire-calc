import React from 'react';

function Logout (props) {

  function logOut() {
    sessionStorage.clear();
    window.location.replace('/');
  }
  
  return (
    <div>
      <p>You are logged in as {props.user}</p>
      <button onClick={logOut}>Log Out</button>
    </div>
  )
}

export default Logout;