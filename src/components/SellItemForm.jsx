import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { Slide } from 'react-toastify';

const FormInput = styled.input`
  font-size: 1.2rem;
  padding: 10px;
  margin-bottom: 10%;
  width: 100%;
  background-color: transparent;
  border-bottom: 1px solid #e7e7e7;
  ::placeholder {
    color: #b7b7b7;
  }
  &:focus {
    outline: none;
  }
  &:hover {
    &::placeholder {
      transition: 0.4s ease-in-out;
      color: #3e3e3e;
    }
  }
  &:focus {
    border-bottom: 1px solid #555555;
  }
`;

const ImageInput = styled(FormInput)`
  font-size: 0.8rem;
  border: none;
`;

const Button = styled(FormInput)`
  background-color: var(--green);
  padding: 10px 20px;
  border: 1px solid var(--green);
  border-radius: var(--circular);
  color: #ffffff;
  &:hover {
    background-color: transparent;
    border: 1px solid var(--green);
    color: var(--green);
  }
`;

const Container = styled.div`
  width: 30vw;
  height: 60vh;
  position: absolute;
  top: 10%;
  left: 0;
  right: 0;
  margin: auto;
  padding: 40px 0;
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  width: 75%;
  margin: auto;
  padding: 20px;
`;

const Label = styled.label``;

const Header = styled.h1`
  font-family: 'Roboto', sans-serif;
  text-align: center;
  margin: auto 0;
`;

class SellItemForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      price: '',
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
      id: this.props.allItems.length
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
  };
  render = () => {
    return (
      <Container>
        <Header>Sell an Item</Header>
        <Form onSubmit={this.handleSubmit}>
          <FormInput
            required
            id="name"
            type="text"
            placeholder="What are you selling?"
            onChange={this.handleProductChange}
            value={this.state.name}
          />
          <FormInput
            required
            id="description"
            type="text"
            placeholder="Describe your item..."
            onChange={this.handleDescription}
            value={this.state.description}
          />
          <Label>Price</Label>
          <FormInput
            required
            id="price"
            type="number"
            placeholder="0.00"
            onChange={this.handlePrice}
            value={this.state.price}
          />
          <ImageInput
            required
            id="image"
            type="file"
            onChange={this.handleImage}
          />
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
