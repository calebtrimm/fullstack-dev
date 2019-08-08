import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';
import './main.css';
import SearchResults from './components/SearchResults.jsx';
import Navbar from './components/Navbar.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import styled from 'styled-components';
import ItemPage from './components/ItemPage.jsx';
import initialItems from './data';
import Cart from './components/Cart.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import UserItems from './components/UserItems.jsx';
import SellItemForm from './components/SellItemForm.jsx';

toast.configure();

const renderHome = () => {
  return (
    <>
      <Navbar />
      <SearchResults />
    </>
  );
};

const renderSell = () => {
  return (
    <>
      <Navbar />
      {/* <UserItems /> */}
      <SellItemForm />
    </>
  );
};

const renderCart = () => {
  return (
    <>
      <Navbar />
      <h1>Shopping Cart</h1>
      <Box>
        <Cart />
      </Box>
    </>
  );
};
const renderDetails = routerData => {
  const itemId = routerData.match.params.id;
  console.log(initialItems);
  let candidates = initialItems.filter(item => {
    return item.id === Number(itemId);
  });
  const item = candidates[0];
  return (
    <>
      <Navbar />
      <ItemPage
        id={item.id}
        name={item.name}
        src={item.src}
        description={item.description}
        price={item.price}
        seller={item.seller}
      />
    </>
  );
};
class App extends Component {
  componentDidMount = async () => {
    let response = await fetch('/session');
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (body.success) {
      this.props.dispatch({
        type: 'LOGIN_SUCCESS'
      });
    }
  };
  handleLogout = () => {
    this.props.dispatch({
      type: 'logout'
    });
  };
  render = () => {
    if (this.props.login) {
      return (
        <BrowserRouter>
          <Route exact={true} path="/" render={renderHome} />
          <Route exact={true} path="/details/:id" render={renderDetails} />
          <Route exact={true} path="/sell/:uid" render={renderSell} />
          <Route exact={true} path="/my-cart/:uid" render={renderCart} />
        </BrowserRouter>
      );
    } else
      return (
        <>
          <Header>
            <Icon>shoobay</Icon>
          </Header>
          <Container>
            <div className="spacer">
              <H4>Signup</H4>
              <Signup />
            </div>
            <div className="spacer">
              <H4>Login</H4>
              <Login />
            </div>
          </Container>
        </>
      );
  };
}

const mapStateToProps = state => {
  return {
    login: state.loggedIn
  };
};

const Container = styled.div`
  width: 30vw;
  height: 60vh;
  position: absolute;
  top: 20vh;
  left: 0;
  right: 0;
  text-align: center;
  margin: auto;
  padding: 40px 0;
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Box = styled.div`
  border: 1px solid #d3d3d3;
  border-right: none;
  border-left: none;
  padding: 2% 0;
`;

const H4 = styled.h4`
  margin-top: 20px;
`;

const Header = styled.div`
  width: 90vw;
  height: 70px;
  margin: auto;
  background-color: #ffffff;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  justify-items: center;
  align-content: center;
  border-bottom: 1px solid lightgray;
`;

const Icon = styled.h1`
  margin: 0;
`;

export default connect(mapStateToProps)(App);
