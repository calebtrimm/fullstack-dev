import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalImage from 'react-modal-image';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import { Slide } from 'react-toastify';

class ItemPage extends Component {
  constructor() {
    super();
  }
  addToCart = async evt => {
    evt.preventDefault();
    const item = {
      id: this.props.id,
      name: this.props.name,
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
    const response = await fetch('/add-to-cart', {
      method: 'POST',
      body: data,
      credentials: 'include'
    });
    const body = await response.json();
    console.log(JSON.parse(body.item));
  };
  render() {
    return (
      <Container>
        {' '}
        <Box>
          <ModalImage
            small={'../' + this.props.src}
            large={'../' + this.props.src}
            imageBackgroundColor="#ebebeb"
            hideDownload={true}
          />
        </Box>
        <Info>
          <Name>{this.props.name}</Name>
          <Details>{this.props.description}</Details>
          <Details>${this.props.price}</Details>
          <Details>Sold by: {this.props.seller}</Details>
          <Button onClick={this.addToCart}>Add to Cart</Button>
        </Info>
      </Container>
    );
  }
}

const Button = styled.button`
  border: none;
  border-radius: var(--circular);
  height: 4%;
  width: 50%;
  margin: 0;
  text-decoration: none;
  background: #000000;
  color: #ffffff;
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  &:hover {
    background-color: #303030;
  }
`;

const Details = styled.h4`
  font-family: 'Roboto', sans-serif;
  margin-left: 2%;
`;

const Name = styled.h1`
  font-family: 'Roboto', sans-serif;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  border-bottom: 1px solid #ebebeb;
  border-bottom-width: 90%;
`;

const Box = styled.div`
  width: 40vw;
  margin-left: 10vw;
`;

const Info = styled(Box)`
  height: 100vh;
  width: 30%;
  position: fixed;
  right: 0;
  padding: 15% 3% 0 3%;
  background-color: #ffffff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
`;

export default connect()(ItemPage);
