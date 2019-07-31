import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

class Sidebar extends Component {
  render = () => {
    return (
      <Container>
        <h4>filter items</h4>
      </Container>
    );
  };
}

const mapStateToProps = state => {
  return {
    filteredItems: state.allItems
  };
};

const Container = styled.div`
  background-color: white;
  border: 1px solid lightgray;
  width: 20vw;
  height: 100vh;
  position: absolute;
  left: 0;
  padding: 10vh 10px;
`;
export default connect(mapStateToProps)(Sidebar);
