// BillForm.js
import React, { useState } from 'react';

function BillForm() {
  const [formData, setFormData] = useState({
    patientName: '',
    address: '',
    hospitalName: '',
    dateOfService: '',
    billAmount: '',
    billPicture: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, billPicture: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('patientName', formData.patientName);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('hospitalName', formData.hospitalName);
    formDataToSend.append('dateOfService', formData.dateOfService);
    formDataToSend.append('billAmount', formData.billAmount);
    formDataToSend.append('billPicture', formData.billPicture);

    fetch('/api/bills', {
      method: 'POST',
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Bill created successfully:', data);
        // Do something with the response, e.g., show a success message or redirect
      })
      .catch((error) => {
        console.error('Error creating bill:', error);
        // Handle the error, e.g., show an error message
      });
  };

  return (
    <div>
      <h2>Add a New Bill</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Patient Name:
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
          />
        </label>
        {/* Rest of the form fields */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default BillForm;