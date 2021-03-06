import React, { Component } from 'react';
import NumberInput from './NumberInput';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

class Main extends Component {
  state = this.initialState();

  initialState() {
    return {
      total: '',
      numPeople: '',
      contributions: { 0: {amount: 0, fixed: false}}
    };
  }

  handleTotalChange(event) {
    const total = event.target.value.replace(/[^.\d]/g, '')
    this.calculateContributions(total, this.state.numPeople);
    this.setState({ total });
  }

  handleNumPeopleChange(event) {
    const numPeople = event.target.value.replace(/\D/g, '');
    this.setDefaultContributions(numPeople);
  }

  setDefaultContributions(people) {
    const total = parseFloat(this.state.total) || 0;
    const numPeople = parseInt(people);

    if (numPeople) {
      const contribution = (total / numPeople).toFixed(2);
      const contributions = {};
      let i;
      for (i in Array(numPeople).fill()) {
        contributions[i] = { amount: contribution, fixed: false };
      }

      this.setState({ total, numPeople, contributions });
    } else {
      this.setState({ numPeople: people });
    }
  }

  calculateContributions(total, numPeople, contributions = {...this.state.contributions}) {
    const tot = parseFloat(total);
    const people = parseInt(numPeople);

    if (tot && people) {
      let fixedTotal = 0;
      let unfixedCount = people;
      for(let v of Object.values(contributions)) {
        if (v.fixed) {
          fixedTotal += parseFloat(v.amount) || 0;
          unfixedCount -= 1;
        }
      }

      const contribution = ((tot - fixedTotal) / unfixedCount).toFixed(2);
      let contrs = {...contributions};
      for (let i in Array(people).fill()) {
        contrs[i] = (contrs[i] && contrs[i].fixed) ? contrs[i] : { amount: contribution, fixed: false };
      }

      this.setState({ contributions: contrs });
    }
  }

  fixContribution(event, index) {
    const obj = { [index]: { amount: event.target.value, fixed: true }};
    const contributions = {...this.state.contributions, ...obj};
    this.calculateContributions(this.state.total, this.state.numPeople, contributions);
  }

  payers() {
    const numPeople = parseInt(this.state.numPeople);
    if (numPeople) {
      const text = (
        <Typography variant="subtitle1" key="text" gutterBottom>
          Override the value for anyone who should pay a different amount.
        </Typography>
      );

      const resetButton = (
        <Button
          key="reset"
          variant="contained"
          type="reset"
          color="default"
          onClick={() => this.setState(this.initialState())}
        >
          <Icon>autorenew</Icon>
          &nbsp;Reset
        </Button>
      );

      const fields = Object.keys(this.state.contributions).map((key, i) => {
        const value = this.state.contributions[key].amount;
        return (
          <NumberInput
            key={key}
            label={`Payer ${i+1}`}
            value={value}
            onChange={(event) => this.fixContribution(event, key)}
          />
        );
      });

      return Array(text).concat(fields).concat(Array(resetButton));
    } else {
      return null
    }
  }

  render() {
    return (
      <div>
        <Typography component="h2" variant="h2" gutterBottom>Fair Shares</Typography>
        <div className="headerFields">
          <NumberInput
            label="Total amount"
            value={this.state.total}
            onChange={this.handleTotalChange.bind(this)}
            variant="outlined"
          />
          <NumberInput
            label="Number of payers"
            value={this.state.numPeople}
            onChange={this.handleNumPeopleChange.bind(this)}
            variant="outlined"
          />
        </div>
        {this.payers()}
      </div>
    );
  }
}

export default Main;

