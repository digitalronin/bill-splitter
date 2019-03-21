import React, { Component } from 'react';
import NumberInput from './NumberInput';

class Main extends Component {
  state = {
    total: '',
    numPeople: 1,
    contributions: {}
  }

  handleTotalChange(event) {
    const total = event.target.value.replace(/[^.\d]/g, '')
    this.calculateContributions(total, this.state.numPeople);
    this.setState({ total });
  }

  handleNumPeopleChange(event) {
    const numPeople = event.target.value.replace(/\D/g, '');
    this.calculateContributions(this.state.total, numPeople);
    this.setState({ numPeople });
  }

  calculateContributions(total, numPeople) {
    const tot = parseFloat(total);
    const people = parseInt(numPeople);
    if (tot && people) {
      const contribution = tot / people;
      let contributions = {};
      Array(people).fill().map((_, i) => contributions[i] = {amount: contribution, fixed: false})
      this.setState({ contributions });
    }
  }

  fixContribution(event, index) {
    const obj = { [index]: { amount: event.target.value, fixed: true }};
    this.setState({ contributions: {...this.state.contributions, ...obj}});
  }

  payers() {
    const numPeople = parseInt(this.state.numPeople);
    if (numPeople) {
      return Object.keys(this.state.contributions).map((key, i) => {
        const val = this.state.contributions[key].amount;
        const value = isNaN(val) ? '' : val;
        return <NumberInput
          key={key}
          label={`Payer ${i+1}`}
          value={value}
          onChange={(event) => this.fixContribution(event, key)}
        />
      });
    } else {
      return null
    }
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
        {this.payers()}
      </div>
    );
  }
}

export default Main;

