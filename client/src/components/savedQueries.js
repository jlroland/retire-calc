import React from 'react';

class Queries extends React.Component {
  constructor(props) {
    super(props);
    this.setState = {items: []};
    // this.state = {items: [{
    //   id: 1,
    //   username: 'jsmith',
    //   password: 'testPass',
    //   currentAge: 30,
    //   retireAge: 65,
    //   monthlyContribution: 250,
    //   employerContribution: 0,
    //   assetAllocation: 'moderate',
    //   expenseRatio: 0.8,
    //   totalPortfolio: 860000
    // },
    // {
    //   id: 2,
    //   username: 'jsmith',
    //   password: 'testPass',
    //   currentAge: 31,
    //   retireAge: 66,
    //   monthlyContribution: 300,
    //   employerContribution: 50,
    //   assetAllocation: 'moderate',
    //   expenseRatio: 0.6,
    //   totalPortfolio: 920000
    // }]};
  }

  // componentDidMount() {
  //   fetch('http://localhost:3000/calculate')
  //     .then((response) => {
  //       this.setState({items: response.data})
  //     },
  //     (error) => {
  //       console.log(error);
  //     });
  // }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Current Age</th>
            <th>Estimated Retirement Age</th>
            <th>Monthly Contribution</th>
            <th>Employer Contribution</th>
            <th>Asset Allocation</th>
            <th>Expense Ratio</th>
            <th>Total Retirement Portfolio</th>
          </tr>
        </thead>
        <tbody>
          {this.state.items.map(item => (
            <tr key={item.id}>
              <td>
                {item.currentAge} {item.retireAge} {item.monthlyContribution} {item.employerContribution} {item.assetAllocation} {item.expenseRatio} {item.totalPortfolio}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default Queries;