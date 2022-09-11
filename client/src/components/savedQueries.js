import React, { Fragment } from 'react';
import Table from 'react-bootstrap/Table';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
      newTotal: '',
      openRow: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.toggleRow = this.toggleRow.bind(this);
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
          // data.map(entry => entry.isHidden = false);
          this.setState({userData: data});
          //console.log(data);
        })
    }
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  toggleRow(id) {
    this.state.openRow === id ? this.setState({openRow: ''}) : this.setState({openRow: id});
  }

  calculateUpdate() {
    // need to account for inflation, asset allocation, expense ratio
    //this.getInfo();
    let rate = 0.05;   //average rate of return from investments
    let workingYears = this.state.newRetireAge - this.state.newCurrentAge;  //how many years contributions are made
    let compFreq = 4;    //how often returns on compounded per year
    let intervalAdjust = 12/compFreq;  //adjusts for the fact that contribution frequency does not match compounding frequency
    let compound = rate/compFreq;
    let total = (parseFloat(this.state.newMonthlyAmount) + parseFloat(this.state.newEmployerAmount)) * intervalAdjust * ((((1+compound)**(compFreq*workingYears))-1)/compound);
    let totalReturn = parseInt(total);
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
      <Table bordered hover>
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
                <td><Button onClick={() => {this.toggleRow(item._id)}}>Edit</Button></td>
                <td><Button onClick={() => this.deleteScenario(item._id)}>Delete</Button></td>
              </tr>
              <Collapse in={this.state.openRow === item._id}>
                <tr>
                  <td><Form.Control id='newCurrentAge' type='number' onChange={this.handleChange}/></td>
                  <td><Form.Control id='newRetireAge' type='number' onChange={this.handleChange}/></td>
                  <td><Form.Control id='newMonthlyAmount' type='text' onChange={this.handleChange}/></td>
                  <td><Form.Control id='newEmployerAmount' type='text' onChange={this.handleChange}/></td>
                  <td><Form.Select id='newAssets' onChange={this.handleChange}>
                  <option value='low'>Low volatility</option>
                  <option value='medium'>Medium volatility</option>
                  <option value='high'>High volatility</option>
                  </Form.Select></td>
                  <td><Form.Control id='newExpenseRatio' type='text' onChange={this.handleChange}/></td>
                  <td>{this.state.newTotal}</td>
                  <td><Button onClick={() => this.calculateUpdate()}>Calculate</Button></td>
                  <td><Button onClick={() => this.updateScenario(item._id)}>Update</Button></td>
                </tr>
              </Collapse>
            </Fragment>
          ))}
        </tbody>
      </Table>
    )
  }
}

export default Queries;