import React, { Component } from 'react';

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
        <div>
          <label>Total amount</label>
          <input
            value={this.state.total}
            onChange={(event) => this.handleTotalChange(event)}
          />
        </div>
      </div>
    );
  }
}

export default Main;

