import React from 'react';
import { useParams } from 'react-router-dom';

const GetParams = () => {
  let params = useParams();
  console.log(params);
  return(params.user);
}

class Queries extends React.Component {
  constructor(props) {
    super(props);
    this.setState = {items: [0,0,0,0,0,0,0]};
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

  componentDidMount() {
    let user = GetParams();
    fetch(`http://localhost:4000/queries/${user}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({items: data});
        });
  }

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