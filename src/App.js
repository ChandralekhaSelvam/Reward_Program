import React, { useState, useEffect, Fragment } from 'react';
import './App.css';
import {getCustomerTransaction} from './services/dataservice';
import calculateRewards from './common/util';

function App() {
  const [custData, setcustData] = useState({});
  const [custRewards, setRewardCalc] = useState({});
  const [custTransaction, setcustTransaction] = useState([]);
  const [currCustomer, setcurrCustomer] = useState("");
  const [customer, setcustomer] = useState([]);

  useEffect(() => {
    getCustomerTransaction()
    .then((data) => setcustData(data))
  }, []);

  const selectCust = (value) => {
    setcurrCustomer(value);
    let customerData = custData[value];
    setcustomer(Object.values(custData));
    console.log("customer", customer)

    let months = {
      1: {
        amounts: [],
        rewards: 0,
      },
      2: {
        amounts: [],
        rewards: 0,
      },
      3: {
        amounts: [],
        rewards: 0,
      },
    };
    for (let i = 0; i < customerData.length; i++) {
      let month = new Date(customerData[i]['date']);
      if (month.getMonth() + 1 == 1 || month.getMonth() + 1 == 2 || month.getMonth() + 1 == 3) {
        months[month.getMonth() + 1]['amounts'].push(customerData[i]['amount']);
      }
    }
    for (let key in months) {
      let totalRewards = 0;
      for (let i = 0; i < months[key]['amounts'].length; i++) {
        let price = months[key]['amounts'][i];
        totalRewards = totalRewards + calculateRewards(price);
      }
      months[key]['rewards'] = totalRewards;
    }
    // console.log("months", months)
    setRewardCalc({ ...months });
    setcustTransaction([...customerData]);
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>Customer Rewards</h2>
      <div className="select-style">
        <select onChange={e => selectCust(e.target.value)} value={currCustomer} >
          <option value="" disabled>Select Customer</option>
          {
            Object.keys(custData).map((item, index) => {
              for(let i = 0; i < item.length; i++) {
                return (
                <option key={index} value={item}> {item} </option>
                )
              }
            })
          }
        </select>
      </div>
      {Object.keys(custRewards).length > 0 &&
        <Fragment>
          <table className="customers">
            <thead>
              <tr>
                <th>Month</th>
                <th>Rewards</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>First Month</td>
                <td>{custRewards[1]["rewards"]}</td>
              </tr>
              <tr>
                <td>Second Month</td>
                <td>{custRewards[2]["rewards"]}</td>
              </tr>
              <tr>
                <td>Third Month</td>
                <td>{custRewards[3]["rewards"]}</td>
              </tr>
              <tr>
                <td>Total Reward</td>
                <td>{custRewards[1]["rewards"] + custRewards[2]["rewards"] + custRewards[3]["rewards"]}</td>
              </tr>
            </tbody>
          </table>
          <h4>Customer Transactions</h4>
          {custTransaction.length > 0 ?
            <table className="customers">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Rewards</th>
                </tr>
              </thead>
              <tbody>
                {custTransaction.map((item, index) => {
                  return <tr key={index}>
                    <td>{item["date"]}</td>
                    <td>{item["amount"]}</td>
                    <td>{calculateRewards(item["amount"])}</td>
                  </tr>
                })}
              </tbody>
            </table>
            : <div>No Transactions Found</div>}
        </Fragment>
      }
    </ div >
  );
}

export default App;
