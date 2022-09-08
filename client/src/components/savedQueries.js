import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function Queries() {
  let urlParams = useParams();
  let user = urlParams.user;
  const [userData, updateData] = useState([]);
  //console.log(userData);
  
  if (userData.length===0) {
    //fetch(` https://retire-calc-back.herokuapp.com/queries/${user}`)
    fetch(`http://localhost:4000/queries/${user}`)
      .then(res => res.json())
      .then(data => {
        updateData(data);
      })
  }

  // need to differentiate between multiple saved queries under same user
  // function deleteData() {
  //   fetch(`http://localhost:4000/delete/${}`, {
  //     method: 'DELETE'
  //   })
  // }

  return(
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
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {userData.map(item => (
          <tr key={item._id}>
            <td>{item.currentAge}</td>
            <td>{item.retireAge}</td>
            <td>{item.monthlyContribution}</td>
            <td>{item.employerContribution}</td>
            <td>{item.assetAllocation}</td>
            <td>{item.expenseRatio}</td>
            <td>{item.totalPortfolio}</td>
            <td><button>Update</button></td>
            {/* <td><button onClick={deleteData}>Delete</button></td> */}
            <td><button>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Queries;