import React, { Fragment } from 'react';

class Queries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      newCurrentAge: 18,
      newRetireAge: 65,
      newMonthlyAmount: 0,
      newEmployerAmount: 0,
      newAssets: 'low',
      newExpenseRatio: 0,
      inflation: 0,
      newTotal: ''
    };

    this.editScenario = this.editScenario.bind(this);
    this.updateScenario = this.updateScenario.bind(this);
    this.deleteScenario = this.deleteScenario.bind(this);
  };
  
  componentDidMount() {
    if (this.state.userData.length===0) {
      //fetch(` https://retire-calc-back.herokuapp.com/queries/${this.state.currentUser}`)
      fetch(`http://localhost:4000/queries/${this.props.user}`)
        .then(res => res.json())
        .then(data => {
          data.map(entry => entry.isHidden = false);
          this.setState({userData: data});
          //console.log(data);
        })
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  editScenario(id) {
    //console.log('clicked');
    let hiddenRow = document.getElementById(id);
    let hiddenStatus = hiddenRow.getAttribute('hidden');
    let editButton = document.getElementById(`button${id}`);
    if (hiddenStatus) {
      hiddenRow.removeAttribute('hidden');
      editButton.textContent = 'Cancel';
    } else {
      hiddenRow.setAttribute('hidden', 'hidden');
      editButton.textContent = 'Edit';
    }
  }

  updateScenario(id) {
    // use calculator function to populate newTotal
    // fetch with post
    // update server routes to do mongo update
  }

  // need to differentiate between multiple saved queries under same user
  deleteScenario(id) {
    fetch(`http://localhost:4000/delete/${id}`, {
      method: 'DELETE'
    })
    .then(res => {
      //console.log(res);
      const updatedData = this.state.userData.filter(entry => entry._id !== id);
      //console.log(updatedData);
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
            <Fragment key={item._id}>
              <tr>
                <td>{item.currentAge}</td>
                <td>{item.retireAge}</td>
                <td>{item.monthlyContribution}</td>
                <td>{item.employerContribution}</td>
                <td>{item.assetAllocation}</td>
                <td>{item.expenseRatio}</td>
                <td>{item.totalPortfolio}</td>
                <td><button id={'button'+item._id} onClick={() => this.editScenario(item._id)}>Edit</button></td>
                <td><button onClick={() => this.deleteScenario(item._id)}>Delete</button></td>
              </tr> 
              <tr id={item._id} hidden>
                <td><input name='newCurrentAge' type='number' onChange={this.handleChange}/></td>
                <td><input name='newRetireAge' type='number' onChange={this.handleChange}/></td>
                <td><input name='newMonthlyAmount' type='text' onChange={this.handleChange}/></td>
                <td><input name='newEmployerAmount' type='text' onChange={this.handleChange}/></td>
                <td><select name='newAssets' onChange={this.handleChange}>
                <option value='low'>Low volatility</option>
                <option value='medium'>Medium volatility</option>
                <option value='high'>High volatility</option>
                </select></td>
                <td><input name='newExpenseRatio' type='text' onChange={this.handleChange}/></td>
                {/* <td>calculate total portfolio</td> */}
                <td></td>
                <td><button onClick={() => this.updateScenario(item._id)}>Update</button></td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    )
  }
}

export default Queries;