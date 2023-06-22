// Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetch('/api/bills')
      .then((response) => response.json())
      .then((data) => setBills(data));
  }, []);

  return (
    <div>
      <h1>Medical Bills</h1>
      <Link to="/add-bill">Add a New Bill</Link>
      <ul>
        {bills.map((bill) => (
          <li key={bill.id}>
            <Link to={`/bill-summary/${bill.id}`}>{bill.patientName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;