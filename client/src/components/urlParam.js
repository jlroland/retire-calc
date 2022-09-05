import React from 'react';
import { useParams } from 'react-router-dom';

//let queryData = [];

function GetParams() {
  let urlParams = useParams();
  let user = urlParams.user;
  console.log([urlParams, typeof urlParams, user, typeof user]);
  fetch(`https://retire-calc-back.herokuapp.com/queries/${user}`)
    .then(res => res.json())
    .then(data => {
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
            {data.map(item => (
              <tr key={item._id}>
                <td>
                  {item.currentAge} {item.retireAge} {item.monthlyContribution} {item.employerContribution} {item.assetAllocation} {item.expenseRatio} {item.totalPortfolio}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    });
}

export default GetParams;