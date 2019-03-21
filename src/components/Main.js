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

  handleNumPeopleChange(event) {
    const numPeople = event.target.value.replace(/\D/g, '')
    this.setState({ numPeople });
  }

  render() {
    return (
      <div>
        <h1>Bill splitter</h1>
        <NumberInput
          label="Total amount"
          value={this.state.total}
          onChange={this.handleTotalChange.bind(this)}
        />
        <NumberInput
          label="Number of payers"
          value={this.state.numPeople}
          onChange={this.handleNumPeopleChange.bind(this)}
        />
      </div>
    );
  }
}

export default Main;

