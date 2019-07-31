import React, { Component } from 'react';
import styled from 'styled-components';

class Items extends Component {
  constructor() {
    super();
  }
  render = () => {
    return (
      <Card>
        <Image src={this.props.src} />
        <Price>${this.props.price}</Price>
        <Details>
          <Name>{this.props.itemName}</Name>
          <p>{this.props.description}</p>
        </Details>
        <Button>Add to Cart</Button>
      </Card>
    );
  };
}

const Button = styled.button`
  display: inline-block;
  border: none;
  padding: 0.5rem 2rem;
  margin: 0;
  text-decoration: none;
  background: #21c287;
  color: #ffffff;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
`;

const Image = styled.img`
  height: 200px;
  object-fit: scale-down;
`;

const Name = styled.h4`
  margin: 0;
`;

const Card = styled.div`
  border: 1px solid lightgray;
  flex-direction: column;
  padding: 2%;
  flex-grow: 0.25;
  flex-basis: 16%;
  display: flex;
`;

const Details = styled(Card)`
  border: none;
`;

const Price = styled.h3`
  font-family: 'Roboto', sans-serif;
  margin: 5px;
`;
export default Items;
