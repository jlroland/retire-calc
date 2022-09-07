import React from 'react';
import { Navigate } from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',
        submitted: false,
        userExists: false
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
      
      fetch(` https://retire-calc-back.herokuapp.com/queries/${this.state.username}`)
      //fetch(`http://localhost:4000/queries/${this.state.username}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data) {
          this.setState({userExists: true});
        }});
      
      // fetch(`https://retire-calc-back.herokuapp.com/queries/${this.state.username}`)
      // .then(res => res.json())
      // .then(data => console.log(data))

      this.setState({submitted: true});
      //console.log(`existing user: ${this.state.username}, ${this.state.password}`)
      // this.setState({
      //   username: '',
      //   password: ''
      // })
    }

    handleSubmitNew(event) {
      event.preventDefault()
      this.setState({submitted: true});
      let newUser = {username: `${this.state.username}`, password: `${this.state.password}`}
      fetch(` https://retire-calc-back.herokuapp.com/exists/${this.state.username}`)
      //fetch(`http://localhost:4000/exists/${this.state.username}`)
      .then(res => res.json())
      .then(data => {
        console.log(`get ${data}`);
        if (data) {
          alert('Please choose another username--this one already exists.');
        }
        else {
          fetch(' https://retire-calc-back.herokuapp.com/addUser', {
          //fetch('http://localhost:4000/addUser', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
          .then(res => res.json())
          .then(data => console.log(`post ${data}`))
        }
      });
      //console.log(`new user: ${this.state.username}, ${this.state.password}`)
      // this.setState({
      //   username: '',
      //   password: ''
      // })
    }
   
    render() {
      return (
        <div>
          {(this.state.submitted===true) && (this.state.userExists===true) && (<Navigate to={`/queries/${this.state.username}`} replace={true} />)}
          {/* {(this.state.submitted===true) && (this.state.userExists===false) && (<Navigate to='/queries' replace={true} />)} */}
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