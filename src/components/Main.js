import React, { Component } from 'react';
import NumberInput from './NumberInput';

class Main extends Component {
  state = {
    total: '',
    numPeople: 1
  }

  handleTotalChange(event) {
    const total = event.target.value.replace(/[^.\d]/g, '')
    this.setState({ total });
  }

  render() {
    return (
      <div>
        <h1>Bill splitter</h1>
        <NumberInput
          label="Totalx amount"
          value={this.state.total}
          onChange={this.handleTotalChange.bind(this)}
        />
      </div>
    );
  }
}

export default Main;

