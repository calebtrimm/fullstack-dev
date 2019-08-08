import React, { Component } from 'react';
import styled from 'styled-components';

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
            <p>${this.props.price}</p>
            <p>{this.props.seller}</p>
          </Details>
          <Button onClick={this.removeFromCart}>Remove Item</Button>
        </Container>
      </>
    );
  }
}

const Details = styled.div`
  width: 40%;
`;

const Button = styled.button`
  position: absolute;
  background-color: transparent;
  padding: 10px;
  left: 64%;
  border: 1px solid black;
  border-radius: 20px;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const Container = styled.div`
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  background-color: #efefef;
  flex-direction: row;
  border-radius: 3px;
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

export default CartItem;
