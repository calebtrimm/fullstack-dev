import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import './main.css';
import Sidebar from './components/Sidebar.jsx';
import styled from 'styled-components';
import Navbar from './components/Navbar.jsx';
import SearchResults from './components/SearchResults.jsx';

const renderHome = () => {
  return (
    <>
      <Navbar />
      {/* <Sidebar /> */}
      <SearchResults />
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
