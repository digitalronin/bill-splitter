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
      Array(people).fill().map((_, i) => contributions[i] = contribution)
      this.setState({ contributions });
    }
  }

  payers() {
    const numPeople = parseInt(this.state.numPeople);
    if (numPeople) {
      console.log(this.state.contributions);
      return Object.keys(this.state.contributions).map((key, i) => {
        const val = this.state.contributions[key];
        const value = isNaN(val) ? '' : val;
        return <NumberInput
          label={`Payer ${i+1}`}
          value={value}
          key={key}
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

