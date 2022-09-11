import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Calculator extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentAge: 18,
        retireAge: 65,
        monthlyAmount: 100,
        employerAmount: 0,
        assets: 'low',
        expenseRatio: 0.5,
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
        monthlyAmount: 100,
        employerAmount: 0,
        assets: 'low',
        expenseRatio: 0.5,
        total: ''
      });
    }

    handleSubmit(event) {
      event.preventDefault();
      this.getInfo();
    }

    // Retrieves historical inflation data to calculate long-term average inflation
    getInfo() {
      //fetch(' https://retire-calc-back.herokuapp.com/inflation')
      fetch('http://localhost:4000/inflation')
        .then(res => res.json())
        .then(data => {
          return data.data.map(entry => parseFloat(entry.value));
        })
        .then(mappedData => {
          let sum = mappedData.reduce((a,b) => {return a+b}, 0);
          let avgInflation = sum/mappedData.length;
          return avgInflation;
        })
        .then((avgInflation) => this.calculateReturn(avgInflation))
    }

    // Calculates total portfolio amount as retirement based on user inputs
    calculateReturn(inflation) {
      // Assign percentages of monthly/employer contributions being allocated to stocks & bonds
      let stock;
      let bond;
      switch (this.state.assets){
        default:
          stock = 0.2;
          bond = 0.8;
          break;
        case 'medium':
          stock = 0.5;
          bond = 0.5;
          break;
        case 'high':
          stock = 0.8;
          bond = 0.2;
      }
      let stockRate = (10 - inflation - (parseFloat(this.state.expenseRatio)))/100;   //average rate of return from equity investments, adjusting for inflation & fees
      let bondRate = (5 - inflation - (parseFloat(this.state.expenseRatio)))/100;   //average rate of return from fixed-come investments, adjusting for inflation & fees
      let workingYears = this.state.retireAge - this.state.currentAge;  //how many years contributions are made
      let compFreq = 4;    //how often returns on compounded per year
      let intervalAdjust = 12/compFreq;  //adjusts for the fact that contribution frequency does not match compounding frequency
      let stockTotal = (stock * (parseFloat(this.state.monthlyAmount) + parseFloat(this.state.employerAmount))) * intervalAdjust * ((((1+(stockRate/compFreq))**(compFreq*workingYears))-1)/(stockRate/compFreq));
      let bondTotal = (bond * (parseFloat(this.state.monthlyAmount) + parseFloat(this.state.employerAmount))) * intervalAdjust * ((((1+(bondRate/compFreq))**(compFreq*workingYears))-1)/(bondRate/compFreq));
      let totalReturn = parseInt(stockTotal + bondTotal);
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
              <Form.Control defaultValue='18' type='number' onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId='retireAge'>
              <Form.Label>Estimated Retirement Age</Form.Label>
              <Form.Control defaultValue='65' type='number' onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId='monthlyAmount'>
              <Form.Label>Your Monthly Contribution</Form.Label>
              <Form.Control defaultValue='100' type='text' onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId='employerAmount'>
              <Form.Label>Employer's Monthly Contribution</Form.Label>
              <Form.Control defaultValue='0' type='text' onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId='assets'>
              <Form.Label>Asset Allocation</Form.Label>
              <Form.Text>Stock/Bond Ratio:  Low = 20/80, Medium = 50/50, High = 80/20</Form.Text>
              <Form.Select defaultValue='low' onChange={this.handleChange}>
                <option value='low'>Low volatility</option>
                <option value='medium'>Medium volatility</option>
                <option value='high'>High volatility</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId='expenseRatio'>
              <Form.Label>Expense Ratio</Form.Label>
              <Form.Text>Default set to 0.5%</Form.Text>
              <Form.Control defaultValue='0.5' type='text' onChange={this.handleChange} />
            </Form.Group>
            <Button type='submit' onClick={this.handleSubmit}>Calculate</Button>
            <Button type='reset' onClick={this.handleReset}>Reset</Button>
            <Form.Text>Your total at retirement will be:</Form.Text>
            <Form.Control plaintext readOnly value={this.state.total} />
            <Button type='submit' onClick={this.saveScenario}>Save</Button>
          </Form>
        </div>
      )
    }
}

export default Calculator;