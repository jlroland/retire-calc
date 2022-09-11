import React from 'react';
import { Navigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',
        //submitted: false,
        userExists: false
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmitExisting = this.handleSubmitExisting.bind(this);
      this.handleSubmitNew = this.handleSubmitNew.bind(this);
    }

    handleChange(event) {
      //console.log({[event.target.id]: event.target.value});
      this.setState({[event.target.id]: event.target.value});
    }

    handleSubmitExisting(event) {
      event.preventDefault();
      //console.log(this.state.username);
      //fetch(` https://retire-calc-back.herokuapp.com/queries/${this.state.username}`)
      fetch(`http://localhost:4000/exists/${this.state.username}`)
      .then(res => res.json())
      .then(data => {
      //console.log(`user exists query ${data.username}`);
        if (data.password === this.state.password) {
          this.props.submitLogin();
          this.props.userUpdate(this.state.username);
          this.setState({userExists: true});
        }
        if (!data || data.password !== this.state.password) {
          alert('The username or password is incorrect. Please try again.');
        }
        });
    }

    handleSubmitNew(event) {
      event.preventDefault()
      //this.setState({submitted: true});
      let newUser = {username: `${this.state.username}`, password: `${this.state.password}`}
      //fetch(` https://retire-calc-back.herokuapp.com/exists/${this.state.username}`)
      fetch(`http://localhost:4000/exists/${this.state.username}`)
      .then(res => res.json())
      .then(data => {
        //console.log(`get ${data}`);
        if (data) {
          alert('Please choose another username--this one already exists.');
        }
        if (!data) {
          //fetch(' https://retire-calc-back.herokuapp.com/addUser', {
          fetch('http://localhost:4000/addUser', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
          .then(res => res.json())
          .then(data => {
            if (data) {
              this.props.submitLogin();
              this.props.userUpdate(this.state.username);
              this.setState({userExists: true});
            }
          })
          // .then(this.setState({userExists: true}))
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
          {(this.state.userExists===true) && (<Navigate to={`/queries/${this.state.username}`} replace={true} />)}
          <Form onSubmit={this.handleSubmitExisting}>
            <Form.Text>Enter username and password</Form.Text>
            <Form.Group controlId='username'>
              <Form.Label>Username:</Form.Label>
              <Form.Control type='text' onChange={this.handleChange} required></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password:</Form.Label>
              <Form.Control type='password' onChange={this.handleChange} required></Form.Control>
            </Form.Group>
            <Button type='submit'>Sign In</Button>
          {/* <form name='newUser' onSubmit={this.handleSubmitNew}>
            <input name='username' type='hidden' value={this.state.username} onChange={this.handleChange}/>
            <input name='password' type='hidden' value={this.state.password} onChange={this.handleChange}/>
            <input type='submit' value='Create Account'/>  */}
          </Form>
          <Accordion>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>New User? Click to Create Account...</Accordion.Header>
              <Accordion.Body>
              <Form onSubmit={this.handleSubmitNew}>
                <Form.Group controlId='username'>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type='text' onChange={this.handleChange} required></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type='password' onChange={this.handleChange} required></Form.Control>
                </Form.Group>
                <Button type='submit'>Create Account</Button>
              </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <h3>NOTE: This is NOT a secure login because this place is currently a playground.  Please don't use sensitive information--just make up something fun!</h3>
        </div>
      )
    }
}

export default Login;