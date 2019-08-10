import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      cart: [] || ''
    };
  }
  componentDidMount = () => {
    this.fetchCart();
    this.fetchInterval = setInterval(this.fetchCart, 500);
  };
  componentWillUnmount = () => {
    window.clearInterval(this.fetchInterval);
  };
  fetchCart = async () => {
    let response = await fetch('/get-cart');
    let body = await response.json();
    if (body.success) {
      this.setState({ cart: body.cart });
    }
  };
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
        {' '}
        <Link className="Link" to={'/'}>
          <Icon>shoobay</Icon>
        </Link>
        <div />
        <SearchForm onSubmit={this.handleRefineSearch}>
          <Searchbar
            type="text"
            placeholder="Search..."
            onChange={this.handleRefineSearch}
            value={this.props.search}
          />
          <Button type="image" src="/imgs/search.png" />
        </SearchForm>
        <Right>
          <NavLink className="Link" to={'/sell/' + this.props.userId}>
            Sell A Pair
          </NavLink>
          <Cart>
            <NavLink to={'/my-cart/' + this.props.userId}>My Cart</NavLink>{' '}
            <Counter> {this.state.cart.length} </Counter>
          </Cart>
          <Logout onClick={this.handleLogout}>Logout</Logout>
        </Right>
      </Container>
    );
  };
}

const mapStateToProps = state => {
  return { search: state.searchQuery, userId: state.userId };
};

const Counter = styled.div`
  display: inline-block;
  border-radius: 50%;
  background-color: var(--green);
  width: 20px;
  text-align: center;
  color: #ffffff;
`;

const Icon = styled.h1`
  margin: 0;
`;

const Right = styled.div`
  margin: 0 20% 0 15%;
  width: 90%;
  min-width: max-content;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
const Cart = styled.div`
  margin: auto;
  width: auto;
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  min-width: max-content;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Button = styled.img`
  padding: 0 10px;
  height: 40px;
  border: 1px solid lightgray;
  border-left: none;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  &:hover {
    transition: 0.4s ease-in-out;
    border: 1px solid slategray;
    border-left: none;
  }
  &:focus-within {
    outline-width: 0;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 70px;
  margin: auto;
  background-color: #ffffff;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr;
  justify-items: center;
  align-content: center;
  border-bottom: 1px solid lightgray;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const NavLink = styled(Link)`
  color: black;
  text-decoration: none;
  &:hover {
    color: #555555;
    text-decoration: underline;
  }
`;

const Searchbar = styled.input`
  font-family: 'Raleway', serif;
  background-color: white;
  border: 1px solid lightgray;
  width: 60%;
  height: 40px;
  padding: 0 10px;
  &:focus {
    outline-width: 0;
  }
  &:focus-within {
    width: 100%;
    transition: 0.4s ease-in-out;
    border: 1px solid black;
  }
`;

const Logout = styled.a`
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: underline;
  }
`;
export default connect(mapStateToProps)(Navbar);
