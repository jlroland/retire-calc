import React from 'react';

class Calculator extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    
    render() {
      return (
        <form>
          <p>Enter your information below</p>
          <label>Current age:
            <input type='text'/>
          </label>
          <label>Estimated retirement age:
            <input type='text'/>
          </label>
          <label>Monthly contribution amount:
            <input type='text'/>
          </label>
          <label>Employer contribution amount:
            <input type='text'/>
          </label>
          <label>Asset allocation:
            <input type='text'/>
          </label>
          <label>Expense ratio:
            <input type='text'/>
          </label>
          <input type='submit' value='Calculate'/>
          <input type='reset'/>
        </form>
      )
    }
}

export default Calculator;