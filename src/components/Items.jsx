import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { Slide } from 'react-toastify';

class Items extends Component {
  constructor() {
    super();
  }
  addToCart = async evt => {
    evt.preventDefault();
    const customToastId = '1';
    const item = {
      id: this.props.id,
      name: this.props.itemName,
      src: this.props.src,
      description: this.props.description,
      price: this.props.price,
      seller: this.props.seller
    };
    toast(item.name + ' was added to cart', {
      position: toast.POSITION.BOTTOM_CENTER,
      hideProgressBar: true,
      transition: Slide
    });
    const itemString = JSON.stringify(item);
    console.log('form submitted');
    let data = new FormData();
    data.append('item', itemString);
    console.log(itemString);
    await fetch('/add-to-cart', {
      method: 'POST',
      body: data,
      credentials: 'include'
    });
  };
  render = () => {
    return (
      <Card>
        <ImgContainer to={'/details/' + this.props.id}>
          <Image src={this.props.src} />
        </ImgContainer>
        <Price>${this.props.price}</Price>
        <Details>
          <Link className="Link" to={'/details/' + this.props.id}>
            <Name>{this.props.itemName}</Name>
          </Link>
          <p>{this.props.description}</p>
        </Details>
        <Button onClick={this.addToCart}>Add to Cart</Button>
      </Card>
    );
  };
}

const Button = styled.button`
  display: inline-block;
  border: none;
  border-radius: var(--circular);
  padding: 0.7rem 2rem;
  margin: 0;
  text-decoration: none;
  background: #000000;
  color: #ffffff;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
`;

const Image = styled.img`
  height: 400px;
  object-fit: scale-down;
  margin: auto;
`;

const ImgContainer = styled(Link)`
  text-align: center;
`;

const Name = styled.h4`
  margin: 0;
  &:hover {
    text-decoration: underline;
  }
`;

const Card = styled.div`
  border: 1px solid #e3e3e3;
  background-color: #e3e3e3;
  flex-direction: column;
  padding: 2%;
  flex-grow: 0.1;
  flex-basis: 16%;
  display: flex;
  margin: 10px;
  &:hover {
    border: 1px solid #d3d3d3;
  }
`;

const Details = styled(Card)`
  border: 1px solid #e3e3e3;
  margin: 0;
  padding: 0;
  &:hover {
    border: 1px solid #e3e3e3;
  }
`;

const Price = styled.h3`
  font-family: 'Roboto', sans-serif;
  margin: 5px 0;
`;
export default connect()(Items);
