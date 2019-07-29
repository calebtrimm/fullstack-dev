import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

class Sidebar extends Component {
  render = () => {
    return (
      <div>
        <h4>Filter Items</h4>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    filteredItems: state.allItems
  };
};

export default connect(mapStateToProps)(Sidebar);
