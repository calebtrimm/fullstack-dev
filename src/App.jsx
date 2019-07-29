import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import './main.css';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
// import SearchResults from './SearchResults'

const renderHome = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      hello world!
    </>
  );
};

class App extends Component {
  render = () => {
    return (
      <BrowserRouter>
        <Route exact={true} path="/" render={renderHome} />
      </BrowserRouter>
    );
  };
}

export default App;
