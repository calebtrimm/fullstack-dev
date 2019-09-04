import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CartItem from './CartItem.jsx';
import { Link } from 'react-router-dom';
import StripeButton from './StripeButton.jsx';

const formatter = new Intl.NumberFormat('en-CAD', {
  style: 'currency',
  currency: 'CAD',
  minimumFractionDigits: 2
});

const Total = styled.h4`
  font-family: 'Roboto', sans-serif;
`;

const Div = styled.div`
  padding-right: 5%;
  text-align: right;
  margin: 3% auto;
`;

const Container = styled.div`
  text-align: center;
  width: 50%;
  margin: 200px auto;
  height: 80%;
`;

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      orderTotal: 0
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
    const response = await fetch('/get-cart');
    const body = await response.json();
    if (body.success) {
      this.setState({ cart: body.cart });
    }
    let total = 0;
    this.state.cart.map(item => {
      total += item.price;
    });
    this.setState({ orderTotal: total });
  };
  render() {
    if (this.state.cart.length === 0) {
      return (
        <div>
          <Container>
            Your cart seems to be empty
            <Link to="/">
              <p>Back to shopping</p>
            </Link>
          </Container>
        </div>
      );
    }
    return (
      <div>
        {this.state.cart.map(item => {
          return (
            <CartItem
              id={item.id}
              name={item.name}
              src={item.src}
              description={item.description}
              price={item.price}
              seller={item.seller}
            />
          );
        })}
        <Div>
          <Total>Order Total: {formatter.format(this.state.orderTotal)}</Total>
          <StripeButton total={this.state.orderTotal} />
        </Div>
      </div>
    );
  }
}

export default connect()(Cart);
