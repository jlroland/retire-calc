import React from 'react';

class Queries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //currentUser: this.props.user,
      userData: []
    };

    this.deleteScenario = this.deleteScenario.bind(this);
  };
  
  componentDidMount() {
    if (this.state.userData.length===0) {
      //fetch(` https://retire-calc-back.herokuapp.com/queries/${this.state.currentUser}`)
      fetch(`http://localhost:4000/queries/${this.props.user}`)
        .then(res => res.json())
        .then(data => {
          this.setState({userData: data});
          console.log(data);
        })
    }
  }

  // need to differentiate between multiple saved queries under same user
  deleteScenario(id) {
    fetch(`http://localhost:4000/delete/${id}`, {
      method: 'DELETE'
    })
    .then(res => {
      //console.log(res);
      const updatedData = this.state.userData.filter(entry => entry._id !== id);
      console.log(updatedData);
      this.setState({userData: updatedData});
    })
  }
  render () {
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
          {this.state.userData.map(item => (
            <tr key={item._id}>
              <td>{item.currentAge}</td>
              <td>{item.retireAge}</td>
              <td>{item.monthlyContribution}</td>
              <td>{item.employerContribution}</td>
              <td>{item.assetAllocation}</td>
              <td>{item.expenseRatio}</td>
              <td>{item.totalPortfolio}</td>
              <td><button>Update</button></td>
              <td><button onClick={() => this.deleteScenario(item._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default Queries;