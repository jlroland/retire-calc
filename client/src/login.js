import React from 'react';

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    
    render() {
      return (
        <form>
          <p>Enter username and password</p>
          <label>Username:
            <input type='text'/>
          </label>
          <label>Password:
            <input type='text'/>
          </label>
          <input type='submit' value='Sign In'/>
        </form>
      )
    }
}

export default Login;