import React from 'react';

function Logout (props) {

  function logOut() {
    sessionStorage.clear();
    window.location.replace('/');
  }
  
  return (
    <div>
      <h1>You are logged in as {props.user}</h1>
      <button onClick={logOut}>Log Out</button>
    </div>
  )
}

export default Logout;