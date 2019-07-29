import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

class Navbar extends Component {
  constructor() {
    super();
  }
  render = () => {
    return (
      <div>
        {/* <img src=""></img> */}
        {/* <Searchbar type="text" /> */}
        {/* <NavLink to={'/my-cart'}>My Cart</NavLink> */}
        {/* <Logout /> */}
      </div>
    );
  };
}

const NavLink = styled(Link)`
  color: black;
  margin: 0 10px;
  text-decoration: none;
  font-size: 1.1rem;
`;

const Searchbar = styled.input`
  background-color: white;
  border-radius: 5px;
  border: none;
  width: 50%;
  height: 30px;
  margin: 10px;
  padding: 0 10px;
`;

let mapStateToProps = state => {
  return { search: state.searchQuery };
};

export default connect(mapStateToProps)(Navbar);
