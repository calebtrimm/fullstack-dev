import React, { Component } from 'react';
import styled from 'styled-components';

const formatter = new Intl.NumberFormat('en-CAD', {
  style: 'currency',
  currency: 'CAD',
  minimumFractionDigits: 2
});

const Details = styled.div`
  width: 40%;
`;

const Price = styled.h3`
  text-align: right;
  position: relative;
  height: max-content;
  right: 0;
  bottom: 0;
  margin: 0;
`;

const Button = styled.button`
  position: relative;
  background-color: transparent;
  padding: 3px 0px;
  left: 12%;
  top: 30px;
  width: 12%;
  height: 5%;
  border: 1px solid black;
  border-radius: var(--circular);
  &:hover {
    background-color: black;
    color: white;
  }
`;

const Container = styled.div`
  border-top: 1px solid var(--pale-grey);
  border-bottom: 1px solid var(--pale-grey);
  /* background-color: var(--pale-grey); */
  flex-direction: row;
  width: 40%;
  padding: 2%;
  flex-grow: 0.1;
  flex-basis: 16%;
  display: flex;
  margin: 10px auto;
`;
const Image = styled.img`
  height: 100px;
  object-fit: scale-down;
  width: 30%;
  margin-right: 5%;
`;

const Name = styled.h4`
  margin: 0;
  &:hover {
    text-decoration: underline;
  }
`;

class CartItem extends Component {
  constructor() {
    super();
    this.state = {};
  }
  removeFromCart = evt => {
    evt.preventDefault();
    const item = {
      id: this.props.id,
      name: this.props.itemName,
      src: this.props.src,
      description: this.props.description,
      price: this.props.price,
      seller: this.props.seller
    };
    const itemString = JSON.stringify(item);
    let data = new FormData();
    data.append('item', itemString);
    console.log(itemString);
    fetch('/remove-from-cart', {
      method: 'POST',
      body: data,
      credentials: 'include'
    });
    this.setState({ state: this.state });
  };
  render() {
    return (
      <>
        <Container>
          <Image src={'../' + this.props.src} />
          <Details>
            <Name>{this.props.name}</Name>
            <p>{this.props.description}</p>
          </Details>
          <Button onClick={this.removeFromCart}>Remove Item</Button>
          <Price>{formatter.format(this.props.price)}</Price>
        </Container>
      </>
    );
  }
}

export default CartItem;
