import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Calculator extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentAge: 18,
        retireAge: 65,
        monthlyAmount: 0,
        employerAmount: 0,
        assets: 'low',
        expenseRatio: 0,
        inflation: 0,
        total: ''
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleReset = this.handleReset.bind(this);
      this.getInfo = this.getInfo.bind(this);
      this.calculateReturn = this.calculateReturn.bind(this);
      this.saveScenario = this.saveScenario.bind(this);
    }

    handleChange(event) {
      this.setState({[event.target.id]: event.target.value});
    }

    handleReset() {
      this.setState({
        currentAge: 18,
        retireAge: 65,
        monthlyAmount: 0,
        employerAmount: 0,
        assets: 'low',
        expenseRatio: 0,
        inflation: 0,
        total: ''
      });
    }

    handleSubmit(event) {
      event.preventDefault();
      this.calculateReturn();
      //console.log(typeof this.state.currentAge);
      //getInfo();
      
    }

    // Retrieves historical inflation data to calculate long-term average inflation
    getInfo() {
      //fetch(' https://retire-calc-back.herokuapp.com/inflation')
      fetch('http://localhost:4000/inflation')
        .then(res => res.json())
        .then(data => data.data.map(entry => parseFloat(entry.value)))
        .then(mappedData => {
          let sum = mappedData.reduce((a,b) => {return a+b}, 0)
          let avgInflation = sum/mappedData.length;
          //console.log(`array sum: ${avgInflation}`)
          this.setState({inflation: avgInflation});
        })
    }

    // Calculates total portfolio amount as retirement based on user inputs
    calculateReturn() {
      // need to account for inflation, asset allocation, expense ratio
      //this.getInfo();
      let rate = 0.05;   //average rate of return from investments
      let workingYears = this.state.retireAge - this.state.currentAge;  //how many years contributions are made
      let compFreq = 4;    //how often returns on compounded per year
      let intervalAdjust = 12/compFreq;  //adjusts for the fact that contribution frequency does not match compounding frequency
      let compound = rate/compFreq;
      let totalReturn = (parseFloat(this.state.monthlyAmount) + parseFloat(this.state.employerAmount)) * intervalAdjust * ((((1+compound)**(compFreq*workingYears))-1)/compound);
      //console.log(parseFloat(this.state.monthlyAmount) + parseFloat(this.state.employerAmount)); 
      //console.log(`working year: ${typeof workingYears}`);
      this.setState({total: totalReturn});    //total portfolio amount at specified retirement age
    }

    // Saves the user's inputs in database
    saveScenario() {
      let savedQuery = this.state;
      savedQuery.username = this.props.user;
      //console.log(savedQuery);
      //fetch(' https://retire-calc-back.herokuapp.com/addScenario', {
      fetch('http://localhost:4000/addScenario', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(savedQuery),  // remove inflation & yield from query ?
          })
      window.location.reload(false);
    }
    
    render() {
      return (
        <div>
          <h3>For details about retirement planning and the concepts used below, please click <a href='/about'>here</a></h3>
          <Form>
            <Form.Text>Enter your information below</Form.Text>
            <Form.Group controlId='currentAge'>
              <Form.Label>Current Age</Form.Label>
              <Form.Control type='number' onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId='retireAge'>
              <Form.Label>Estimated Retirement Age</Form.Label>
              <Form.Control type='number' onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId='monthlyAmount'>
              <Form.Label>Your Monthly Contribution</Form.Label>
              <Form.Control type='text' onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId='employerAmount'>
              <Form.Label>Employer's Monthly Contribution</Form.Label>
              <Form.Control type='text' onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId='assets'>
              <Form.Label>Asset Allocation</Form.Label>
              <Form.Select onChange={this.handleChange}>
                <option value='low'>Low volatility</option>
                <option value='medium'>Medium volatility</option>
                <option value='high'>High volatility</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId='expenseRatio'>
              <Form.Label>Expense Ratio</Form.Label>
              <Form.Control type='text' onChange={this.handleChange} />
            </Form.Group>
            <Button type='submit' onClick={this.handleSubmit}>Calculate</Button>
            <Button type='reset'>Reset</Button>
            <Form.Text>Your total portfolio amount at retirement will be: {this.state.total}</Form.Text>
            <Button type='submit' onClick={this.saveScenario}>Save</Button>
          </Form>
        </div>
      )
    }
}

export default Calculator;