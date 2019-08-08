import { connect } from 'react-redux';
import React, { Component } from 'react';
import Items from './Items.jsx';
import styled from 'styled-components';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allItems: props.allItems
    };
  }
  componentDidMount = async () => {
    const response = await fetch('/get-user-items');
    console.log(response);
    const body = await response.json();
    console.log(body.newItems);
    if (body.success) {
      this.setState({ allItems: this.state.allItems.concat(body.newItems) });
    }
  };
  render = () => {
    const results = this.state.allItems.filter(item => {
      return (
        item.name.toLowerCase().includes(this.props.query) ||
        item.name.includes(this.props.query)
      );
    });
    console.log('results', results);
    return (
      <Container>
        {results.map(result => {
          return (
            <Items
              key={result.id}
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
  flex-wrap: wrap;
  justify-content: center;
  width: 80vw;
  margin: 100px auto;
`;

const mapStateToProps = state => {
  return { query: state.searchQuery, allItems: state.allItems };
};

export default connect(mapStateToProps)(SearchResults);
