import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      showForm: false
    };
  }
  handleForm = event => {
    event.preventDefault();
    this.props.dispatch({
      type: 'TOGGLE_FORM',
      showForm: !this.state.showForm
    });
  };
  handleUsernameChange = event => {
    console.log('new username', event.target.value);
    this.setState({ username: event.target.value });
  };
  handlePasswordChange = event => {
    console.log('new password', event.target.value);
    this.setState({ password: event.target.value });
  };
  handleSubmit = async evt => {
    evt.preventDefault();
    console.log('login form submitted');
    let data = new FormData();
    data.append('username', this.state.username);
    data.append('password', this.state.password);
    let response = await fetch('/login', {
      method: 'POST',
      body: data,
      credentials: 'include'
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      alert('Login failed');
      return;
    }
    this.props.dispatch({
      type: 'LOGIN_SUCCESS'
    });
  };
  render = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          {' '}
          <Input
            type="text"
            placeholder="username"
            onChange={this.handleUsernameChange}
          />
        </div>
        <div>
          {' '}
          <Input
            type="password"
            placeholder="password"
            onChange={this.handlePasswordChange}
          />
        </div>
        <div>
          {' '}
          <Button type="submit" value="Log In" />
        </div>
        Don't have an account?{' '}
        <Signup onClick={this.handleForm}>Sign Up</Signup>
      </form>
    );
  };
}

const Input = styled.input`
  font-size: 1.2rem;
  padding: 10% 10px 10px 10px;
  margin-top: 10px;
  width: 50%;
  background-color: transparent;
  border-bottom: 1px solid #e7e7e7;
  ::placeholder {
    color: #b7b7b7;
  }
  &:focus {
    outline: none;
  }
  &:hover {
    &::placeholder {
      transition: 0.4s ease-in-out;
      color: #3e3e3e;
    }
  }
  &:focus {
    border-bottom: 1px solid #555555;
  }
`;

const Button = styled(Input)`
  margin-top: 20px;
  background-color: var(--highlight);
  padding: 10px 20px;
  border: 1px solid var(--highlight);
  border-radius: var(--circular);
  color: #ffffff;
  &:hover {
    background-color: var(--hover-highlight);
    border: 1px solid var(--hover-highlight);
  }
  &:focus {
    border: 1px solid var(--highlight);
  }
`;

const Signup = styled.button`
margin-top: 20px;
    -webkit-appearance: none;
    border: none;
    text-decoration: underline;
    background: none;
}`;

export default connect()(Login);
