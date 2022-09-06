import React from 'react';

function getInfo() {
  fetch('http://localhost:4000/calculate')
    .then(res => res.json())
    .then(data => data.data.map(entry => entry.value))
    .then(mappedData => {return mappedData})
}

class Calculator extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentAge: 0,
        retireAge: 0,
        monthlyAmount: 0,
        employerAmount: 0,
        assets: 'low',
        expenseRatio: 0,
        total: ''
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleReset = this.handleReset.bind(this);
      this.saveScenario = this.saveScenario.bind(this);
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }

    handleReset() {
      this.setState({
        currentAge: 0,
        retireAge: 0,
        monthlyAmount: 0,
        employerAmount: 0,
        assets: 'low',
        expenseRatio: 0,
        total: ''
      });
    }

    handleSubmit(event) {
      event.preventDefault();
      this.setState({total: 20});
      console.log(getInfo());
      //getInfo();
      //write function to calculate total and set state for total
      
    }

    saveScenario() {
      let savedQuery = this.state;
      fetch('http://localhost:4000/addScenario', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(savedQuery),
          })
      this.handleReset();  //re-route to Saved Scenarios page?
    }
    
    render() {
      return (
        <div>
          <form>
            <p>Enter your information below</p>
            <label>Current age:
              <input name='currentAge' type='text' value={this.state.currentAge} onChange={this.handleChange}/>
            </label>
            <label>Estimated retirement age:
              <input name='retireAge' type='text' value={this.state.retireAge} onChange={this.handleChange}/>
            </label>
            <label>Monthly contribution amount:
              <input name='monthlyAmount' type='text' value={this.state.monthlyAmount} onChange={this.handleChange}/>
            </label>
            <label>Employer contribution amount:
              <input name='employerAmount' type='text' value={this.state.employerAmount} onChange={this.handleChange}/>
            </label>
            <label>Asset allocation:
              <select name='assets' value={this.state.assets} onChange={this.handleChange}>
                <option value='low'>Low volatility</option>
                <option value='medium'>Medium volatility</option>
                <option value='high'>High volatility</option>
                <option value='blend'>Target Date Blend</option>
              </select>
            </label>
            <label>Expense ratio:
              <input name='expenseRatio' type='text' value={this.state.expenseRatio} onChange={this.handleChange}/>
            </label>
            <button onClick={this.handleSubmit}>Calculate</button>
            <button onClick={this.handleReset}>Reset</button>
          </form>
          <h3>Your total portfolio amount at retirement will be: {this.state.total}</h3>
          <button onClick={this.saveScenario}>Save</button>
        </div>
      )
    }
}

export default Calculator;