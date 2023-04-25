import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Table.css';
import './styles/Dropdown.css';

export default function Table() {
  
  const [users, setUsers] = useState([]);
  const [selectedTable, setSelectedTable] = useState('Table 1');

  useEffect(() => {
    axios.get('https://userdata-qqlp.onrender.com')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  //Filter functions

  const filter1 = () => {
    return users.filter(user => {
      const income = parseInt(user.income.slice(1));
      const hasMercedesOrBMW = user.car.includes("Mercedes") || user.car.includes("BMW");
  
      return income < 5 && hasMercedesOrBMW;
    });
  };

  const filter2 = () => {
    return users.filter(user => {
      const gender = user.gender;
      const price = parseInt(user.phone_price);

      return gender === "Male" && price > 10000;
    });
  };

  const filter3 = () => {
    return users.filter(user => {
      const lastM = user.last_name.startsWith("M");
      const chars = user.quote.length > 15;
      const newEmail = user.email.includes(user.last_name.toLowerCase());
      return lastM && chars && newEmail;
    });
  };

  const filter4 = () => {
    return users.filter(user => {
      const cars = user.car.includes("Mercedez") || user.car.includes("Audi") || user.car.includes("BMW")
      const regex = /\d/
      const containsDigit = regex.test(user.email);

      return cars && regex && containsDigit;
    });
  };

const cities = users.reduce((acc, user) => {
    acc[user.city] = acc[user.city] || { users: [], totalIncome: 0 };
    acc[user.city].users.push(user);
    acc[user.city].totalIncome += parseInt(user.income.slice(1));
    return acc;
  }, {});

  const cityList = Object.keys(cities).map(city => {
    return {
      name: city,
      userCount: cities[city].users.length,
      averageIncome: cities[city].totalIncome / cities[city].users.length
    };
  });


  cityList.sort((a, b) => b.userCount - a.userCount);


  const handleTableSelect = (event) => {
    setSelectedTable(event.target.value);
  };

  let filteredUsers = [];
  switch (selectedTable) {
    case 'Table 1':
      filteredUsers = filter1(users);
      break;
    case 'Table 2':
      filteredUsers = filter2(users);
      break;
    case 'Table 3':
      filteredUsers = filter3(users);
      break;
    case 'Table 4':
      filteredUsers = filter4(users);
      break;
    default:
      filteredUsers = filter1(users);
  }

  let tableHeader;
  switch (selectedTable) {
    case 'Table 1':
        tableHeader = <span>Users whose income is less than $5 and own a <span className='span-style'>BMW/Mercedes</span></span>
      break;
    case 'Table 2':
        tableHeader = <span>Male users whose phones are worth more than <span className='span-style'>10,000</span></span>
      break;
    case 'Table 3':
        tableHeader = <span>Users whose last name start with M, quote length exceeds 15, and email having last name</span>
      break;
    case 'Table 4':
        tableHeader = <span>Users with <span className='span-style'>Mercedes/Audi/BMW</span> and number in their email</span>
      break;
    default:
        tableHeader = <span>Top 10 cities with the highest users and their average income</span>
  }
  



  return (
    <div className='header'>
         <div className="dropdown">
        <label htmlFor="dropdown-select" className="dropdown-text">Select a table:</label>
        <select className="dropdown-select" value={selectedTable} onChange={handleTableSelect}>
          <option value="Table 1">Table 1</option>
          <option value="Table 2">Table 2</option>
          <option value="Table 3">Table 3</option>
          <option value="Table 4">Table 4</option>
          <option value="Table 5">Table 5</option>
        </select>
      </div>
      <h1 className='table-title'>{tableHeader}</h1>
    <div className="table-container">

      <table className="table">
        
        <thead>
          <tr className="table-header">
          {selectedTable === "Table 5" ? (
            <>
              <th className="table-data city">City</th>
              <th className="table-data users">Users</th>
              <th className="table-data income">Average Income</th>
            </>
          ) : (
            <>
              <th className="table-data name">Name</th>
              <th className="table-data id">Id</th>
              <th className="table-data email">Email</th>
              <th className="table-data gender">Gender</th>
              <th className="table-data city">City</th>
              <th className="table-data income">Income</th>
              <th className="table-data phone">Phone price</th>
              <th className="table-data car">Car</th>
            </>
          )}
          </tr>
        </thead>


        <tbody>
        {selectedTable === "Table 5" ? (
        <>
          {cityList.slice(0,10).map(city => (
            <tr key={city.name} className="table-row">
              <td className="table-data city">{city.name}</td>
              <td className="table-data users">{city.userCount}</td>
              <td className="table-data income">${city.averageIncome.toFixed(2)}</td>
            </tr>
          ))}
        </>
      ) : (
        <>
          {filteredUsers.map(user => (
            <tr key={user._id} className="table-row">
              <td className="table-data name">{user.first_name} {user.last_name}</td>
              <td className="table-data id">{user.id}</td>
              <td className="table-data email">{user.email}</td>
              <td className="table-data gender">{user.gender}</td>
              <td className="table-data city">{user.city}</td>
              <td className="table-data income">{user.income}</td>
              <td className="table-data phone">{user.phone_price}</td>
              <td className="table-data car">{user.car}</td>
              <div className="card">
                  <p><span>Quote: </span> {user.quote}</p>
                  {/* <p><span>Gender: </span> {user.gender}</p>
                  <p><span>Mail: </span> {user.email}</p>
                  <p><span>City: </span> {user.city}</p>
                  <p><span>Phone price: </span> {user.phone_price}</p> */}
                </div>
            </tr>
          ))}
        </>
      )}
        </tbody>


      </table>
    </div>
    </div>
  );
}

