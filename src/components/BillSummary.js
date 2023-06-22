// BillSummary.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function BillSummary() {
  const { id } = useParams();
  const [bill, setBill] = useState(null);

  useEffect(() => {
    fetch(`/api/bills/${id}`)
      .then((response) => response.json())
      .then((data) => setBill(data));
  }, [id]);

  if (!bill) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Bill Summary</h2>
      <p>Patient Name: {bill.patientName}</p>
      {/* Display the rest of the bill information */}
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default BillSummary;