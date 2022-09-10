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

    this.handleChange = this.handleChange.bind(this);
    this.editScenario = this.editScenario.bind(this);
    this.calculateUpdate = this.calculateUpdate.bind(this);
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
    //console.log(hiddenRow);
    //console.log(hiddenStatus);
    let editButton = document.getElementById(`button${id}`);
    if (hiddenStatus) {
      hiddenRow.removeAttribute('hidden');
      editButton.textContent = 'Cancel';
    } else {
      hiddenRow.setAttribute('hidden', 'hidden');
      editButton.textContent = 'Edit';
    }
  }

  calculateUpdate() {
    // need to account for inflation, asset allocation, expense ratio
    //this.getInfo();
    let rate = 0.05;   //average rate of return from investments
    let workingYears = this.state.newRetireAge - this.state.newCurrentAge;  //how many years contributions are made
    let compFreq = 4;    //how often returns on compounded per year
    let intervalAdjust = 12/compFreq;  //adjusts for the fact that contribution frequency does not match compounding frequency
    let compound = rate/compFreq;
    let totalReturn = (parseFloat(this.state.newMonthlyAmount) + parseFloat(this.state.newEmployerAmount)) * intervalAdjust * ((((1+compound)**(compFreq*workingYears))-1)/compound);
    //console.log(parseFloat(this.state.monthlyAmount) + parseFloat(this.state.employerAmount)); 
    //console.log(`working year: ${typeof workingYears}`);
    this.setState({newTotal: totalReturn});    //total portfolio amount at specified retirement age
  }

  updateScenario(id) {
    this.calculateUpdate();
    let updatedQuery = this.state;
    updatedQuery.username = this.props.user;
    //console.log(savedQuery);
    //fetch(' https://retire-calc-back.herokuapp.com/addScenario', {
    fetch(`http://localhost:4000/updateScenario/${id}`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedQuery),  // remove inflation & yield from query ?
        })
    window.location.reload(false);
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
                <td>{this.state.newTotal}</td>
                <td><button onClick={() => this.calculateUpdate()}>Calculate</button></td>
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