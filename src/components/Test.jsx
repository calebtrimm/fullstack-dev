import React, { Component } from 'react';
import { connect } from 'react-redux';
class Test extends Component {
  render() {
    return <div>Hello World!</div>;
  }
}

export default connect()(Test);
