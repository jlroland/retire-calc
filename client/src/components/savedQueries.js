import React from 'react';

class Queries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <table>
        <tr>
          <th>Current Age</th>
          <th>Estimated Retirement Age</th>
          <th>Monthly Contribution</th>
          <th>Employer Contribution</th>
          <th>Asset Allocation</th>
          <th>Expense Ratio</th>
          <th>Total Retirement Portfolio</th>
        </tr>
      </table>
    )
  }
}

export default Queries;