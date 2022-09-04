import React from 'react';
import { Navigate } from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',
        submitted: false
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmitExisting = this.handleSubmitExisting.bind(this);
      this.handleSubmitNew = this.handleSubmitNew.bind(this);
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }

    handleSubmitExisting(event) {
      event.preventDefault();
      this.setState({submitted: true});
      fetch(`http://localhost:3000/queries/${this.state.username}`)
      .then(res => console.log(res.data));

      //console.log(`existing user: ${this.state.username}, ${this.state.password}`)
      // this.setState({
      //   username: '',
      //   password: ''
      // })
    }

    handleSubmitNew(event) {
      event.preventDefault()
      this.setState({submitted: true});
      //console.log(`new user: ${this.state.username}, ${this.state.password}`)
      // this.setState({
      //   username: '',
      //   password: ''
      // })
    }
   
    render() {
      return (
        <div>
          {(this.state.submitted===true) && (<Navigate to='/queries' replace={true} />)}
          <form name='existingUser' onSubmit={this.handleSubmitExisting}>
            <p>Enter username and password</p>
            <label>Username:
              <input name='username' type='text' value={this.state.username} onChange={this.handleChange}/>
            </label>
            <label>Password:
            <input name='password' type='text' value={this.state.password} onChange={this.handleChange}/>
            </label>
            <input type='submit' value='Sign In'/>
          </form>
          <form name='newUser' onSubmit={this.handleSubmitNew}>
            <input name='usernameNew' type='hidden' value={this.state.username} onChange={this.handleChange}/>
            <input name='passwordNew' type='hidden' value={this.state.password} onChange={this.handleChange}/>
            <input type='submit' value='Create Account'/>
          </form>
        </div>
      )
    }
}

export default Login;