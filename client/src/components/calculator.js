import React from 'react';

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
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
      event.preventDefault()
    }
    
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
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
          <input type='submit' value='Calculate'/>
          <input type='reset'/>
        </form>
      )
    }
}

export default Calculator;