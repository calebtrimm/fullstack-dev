import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

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
            type="text"
            placeholder="username"
            onChange={this.handleUsernameChange}
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="password"
            onChange={this.handlePasswordChange}
          />
          <div>
            <Button type="submit" />
          </div>
        </div>
      </form>
    );
  };
}

const Input = styled.input`
  font-size: 1.2rem;
  padding: 10px;
  margin-top: 10px;
  width: 50%;
  background-color: transparent;
  border-bottom: 1px solid var(--pale-grey);
  ::placeholder {
    color: var(--pale-grey);
  }
  &:hover {
    &::placeholder {
      transition: 0.4s ease-in-out;
      color: var(--hover-grey);
    }
  }
  &:focus {
    outline: none;
    border-bottom: 1px solid var(--dark-grey);
  }
`;

const Button = styled(Input)`
  background-color: var(--green);
  padding: 10px 20px;
  border: 1px solid var(--green);
  border-radius: var(--circular);
  color: #ffffff;
  &:hover {
    background-color: transparent;
    border: 1px solid var(--green);
    color: var(--green);
  }
`;

export default connect()(Signup);
