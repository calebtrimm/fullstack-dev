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
import SellItemForm from './components/SellItemForm.jsx';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
      <BGContainer>
        <Background src="/imgs/sell-form-bg.jpg" />
      </BGContainer>
      <Navbar />
      <SellItemForm />
    </>
  );
};

const renderCart = () => {
  return (
    <>
      <Navbar />
      <Box>
        <h3 className="title">Shopping Cart</h3>
        <Cart />
      </Box>
    </>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allItems: this.props.allItems
    };
  }
  componentDidMount = async () => {
    let response = await fetch('/session');
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (body.success) {
      this.props.dispatch({
        type: 'LOGIN_SUCCESS'
      });
    }
    this.getItems();
  };
  getItems = async () => {
    const response = await fetch('/get-user-items');
    console.log(response);
    const body = await response.json();
    if (body.success) {
      console.log('new items', body.newItems);
      this.setState({ allItems: this.state.allItems.concat(body.newItems) });
    }
  };
  renderDetails = routerData => {
    const itemId = routerData.match.params.id;
    console.log(this.state.allItems);
    let candidates = this.state.allItems.filter(item => {
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
          <Route exact={true} path="/details/:id" render={this.renderDetails} />
          <Route exact={true} path="/sell/:uid" render={renderSell} />
          <Route exact={true} path="/my-cart/:uid" render={renderCart} />
        </BrowserRouter>
      );
    } else if (this.props.signUp) {
      return (
        <>
          <Container>
            <Icon>shoobay</Icon>
            <TransitionGroup>
              <CSSTransition key={1} timeout={500} classNames="fade">
                <div className="spacer">
                  <H4>Signup</H4>
                  <Signup />
                </div>
              </CSSTransition>
            </TransitionGroup>
            <Img src="/imgs/landing.jpg" />
          </Container>
        </>
      );
    } else {
      return (
        <>
          <Container>
            <Icon>shoobay</Icon>
            <TransitionGroup>
              <CSSTransition key={0} timeout={500} classNames="fade">
                <div className="spacer">
                  <H4>Login</H4>
                  <Login />
                </div>
              </CSSTransition>
            </TransitionGroup>
            <Img src="/imgs/landing.jpg" />
          </Container>
        </>
      );
    }
  };
}

const mapStateToProps = state => {
  return {
    login: state.loggedIn,
    signUp: state.signUp,
    allItems: state.allItems
  };
};

const Background = styled.img`
  max-width: 60vw;
  position: fixed;
  top: -22%;
`;

const Container = styled.div`
  width: 31vw;
  height: 100vh;
  position: absolute;
  text-align: center;
  margin: auto;
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Box = styled.div`
  width: 30vw;
  height: 90%;
  margin: 7% auto;
  padding: 3%;
  background-color: #ffffff;
  opacity: 0.98;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
`;

const Img = styled.img`
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  z-index: -1;
`;

const H4 = styled.h4`
  margin-top: 20%;
`;

const Header = styled.div`
  width: 100vw;
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

const BGContainer = styled.div`
  width: 100vw;
  background-color: #000000;
  overflow: hidden;
`;
const Icon = styled.h1`
  margin-top: 10%;
  font-size: 3rem;
`;

export default connect(mapStateToProps)(App);
