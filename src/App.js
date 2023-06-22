import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import BillForm from './components/BillForm';
import BillSummary from './components/BillSummary';


axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/add-bill" element={<BillForm/>} />
          <Route path="/bill-summary/:id" element={<BillSummary/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
