import { connect } from 'react-redux';
import React, { Component } from 'react';
import Items from './Items.jsx';
import styled from 'styled-components';

class SearchResults extends Component {
  constructor() {
    super();
  }
  render = () => {
    const results = this.props.allItems.filter(item => {
      return (
        item.name.toLowerCase().includes(this.props.query) ||
        item.name.includes(this.props.query)
      );
    });
    return (
      <Container>
        {results.map(result => {
          return (
            <Items
              itemName={result.name}
              id={result.id}
              src={result.src}
              description={result.description}
              price={result.price}
            />
          );
        })}
      </Container>
    );
  };
}

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 80vw;
  margin: 100px auto;
`;

const mapStateToProps = state => {
  return { query: state.searchQuery, allItems: state.allItems };
};

export default connect(mapStateToProps)(SearchResults);
