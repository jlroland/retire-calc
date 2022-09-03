import React from 'react';

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: ''
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
      event.preventDefault()
    }
   
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <p>Enter username and password</p>
          <label>Username:
            <input name='username' type='text' value={this.state.username} onChange={this.handleChange}/>
          </label>
          <label>Password:
          <input name='password' type='text' value={this.state.password} onChange={this.handleChange}/>
          </label>
          <input type='submit' value='Sign In'/>
          <input type='submit' value='Create Account'/>
        </form>
      )
    }
}

export default Login;