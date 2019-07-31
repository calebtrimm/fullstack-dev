import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

class Navbar extends Component {
  constructor() {
    super();
  }
  handleRefineSearch = event => {
    this.props.dispatch({
      type: 'REFINE_SEARCH',
      search: event.target.value
    });
  };

  handleLogout = () => {
    this.props.dispatch({
      type: 'LOGOUT'
    });
  };
  render = () => {
    return (
      <Container>
        <Icon>Alibay</Icon>
        <Searchbar
          type="text"
          onChange={this.handleRefineSearch}
          value={this.props.search}
        />
        {/* <NavLink to={'/my-cart'}>My Cart</NavLink> */}
        <Logout onClick={this.handleLogout}>logout</Logout>
      </Container>
    );
  };
}

const mapStateToProps = state => {
  return { search: state.searchQuery };
};

const Icon = styled.h1`
  margin: 0;
`;

const Container = styled.div`
  width: 100vw;
  height: 50px;
  background-color: #ffffff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  justify-items: center;
  border-bottom: 1px solid lightgray;
`;

const NavLink = styled(Link)`
  color: black;
  margin: 0 10px;
  text-decoration: none;
  font-size: 1.1rem;
`;

const Searchbar = styled.input`
  background-color: white;
  border: 1px solid lightgray;
  width: 50%;
  height: 30px;
  margin: auto;
  padding: 0 10px;
`;

const Logout = styled.a`
  text-decoration: none;
  color: black;
`;
export default connect(mapStateToProps)(Navbar);
