import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showForm: true
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
    this.setState({ username: event.target.value });
  };
  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };
  handleSubmit = async evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append('username', this.state.username);
    data.append('password', this.state.password);
    let response = await fetch('/signup', { method: 'POST', body: data });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      alert('Username already taken');
      return;
    } else {
      alert('Signup successful');
      this.props.dispatch({
        type: 'LOGIN_SUCCESS',
        userId: body.userId
      });
    }
  };
  render = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <Input
            required
            type="text"
            placeholder="username"
            onChange={this.handleUsernameChange}
          />
        </div>
        <div>
          <Input
            required
            type="password"
            placeholder="password"
            onChange={this.handlePasswordChange}
          />
          <div>
            <Button type="submit" value="Sign Up" />
          </div>
          Already a user? <Login onClick={this.handleForm}>Log In</Login>
        </div>
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

const Login = styled.button`
  margin-top: 20px;
  -webkit-appearance: none;
  border: none;
  text-decoration: underline;
  background: none;
`;

export default connect()(Signup);
