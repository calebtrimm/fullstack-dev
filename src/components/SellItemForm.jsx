import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { Slide } from 'react-toastify';

const generateId = () => {
  return '' + Math.floor(Math.random() * 100000000);
};

const FormInput = styled.input`
  font-size: 1.2rem;
  padding: 10px;
  margin-bottom: 5%;
  width: 50%;
  background-color: transparent;
  border: var(--subtle-border);
  ::placeholder {
    color: #b7b7b7;
  }
  &:hover {
    &::placeholder {
      transition: 0.4s ease-in-out;
      color: #3e3e3e;
    }
  }
  &:focus {
    border: 1px solid #555555;
    outline: none;
    width: 90%;
    transition: 0.4s ease-in-out;
  }
`;

const ImageInput = styled(FormInput)`
  font-size: 0.8rem;
  border: none;
`;

const Button = styled(FormInput)`
  background-color: black;
  padding: 10px 20px;
  border: 1px solid black;
  border-radius: var(--circular);
  color: #ffffff;
  margin: 5% auto;
  width: 40%;
  &:hover {
    transition: 0.4s ease-in-out;
    background-color: var(--dark-grey);
    border: 1px solid var(--dark-grey);
  }
  &:focus {
    width: 40%;
  }
`;

const Container = styled.div`
  width: 40vw;
  height: 90%;
  position: absolute;
  right: 0;
  margin: auto;
  padding-top: 5%;
  background-color: #ffffff;
  opacity: 0.98;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  width: 90%;
  margin: auto;
`;

const Label = styled.h3``;

const Header = styled.h1`
  font-family: 'Roboto', sans-serif;
  text-align: center;
  margin-bottom: 10%;
`;

const Spacer = styled.div`
  margin-left: 3%;
`;

class SellItemForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      price: 0,
      image: ''
    };
  }
  handlePrice = evt => {
    this.setState({
      price: evt.target.value
    });
  };
  handleProductChange = evt => {
    this.setState({
      name: evt.target.value
    });
  };
  handleDescription = evt => {
    this.setState({
      description: evt.target.value
    });
  };
  handleImage = event => {
    this.setState({ image: event.target.files[0] });
  };
  handleSubmit = async event => {
    event.preventDefault();
    const item = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      src: `imgs/${this.state.image.name}`,
      seller: '',
      id: Number(this.props.allItems.length)
    };
    console.log(item);
    console.log('form submitted');
    const itemString = JSON.stringify(item);
    let data = new FormData();
    data.append('item', itemString);
    fetch('/sell-item', {
      method: 'POST',
      body: data,
      credentials: 'include'
    });
    toast('Congrats! Your shoes are now up for sale.', {
      position: toast.POSITION.BOTTOM_CENTER,
      hideProgressBar: true,
      transition: Slide
    });
    this.props.dispatch(
      {
        type: 'ADD_ITEM',
        item: item
      },
      console.log('adding item')
    );
  };
  render = () => {
    return (
      <Container>
        <Header>Sell Your Shoes</Header>
        <Form onSubmit={this.handleSubmit}>
          <Spacer>
            <Label>Product</Label>
            <FormInput
              required
              id="name"
              type="text"
              placeholder="What are you selling?"
              onChange={this.handleProductChange}
              value={this.state.name}
            />
          </Spacer>
          <Spacer>
            <Label>Description</Label>
            <FormInput
              required
              id="description"
              type="text"
              placeholder="Describe your item..."
              onChange={this.handleDescription}
              value={this.state.description}
            />
          </Spacer>
          <Spacer>
            <Label>Price</Label>
            <FormInput
              required
              id="price"
              type="number"
              placeholder="0.00"
              onChange={this.handlePrice}
              value={this.state.price}
            />
          </Spacer>
          <Spacer>
            <Label>Upload an image of your product</Label>
            <ImageInput
              required
              id="image"
              type="file"
              onChange={this.handleImage}
            />
          </Spacer>
          <Button type="submit" />
        </Form>
      </Container>
    );
  };
}

const mapStateToProps = state => {
  return { allItems: state.allItems };
};

export default connect(mapStateToProps)(SellItemForm);
