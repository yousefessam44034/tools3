import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import DoctorPage from './DoctorPage'; // Import the new component
import PatientPage from './PatientPage';
import ConnectionStatus from './ConnectionStatus';



const App = () => (
  <Router>
    <Routes>
      <Route path="/ConnectionStatus" element={<ConnectionStatus />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/patient" element={<PatientPage />} />
      <Route path="/doctor" element={<DoctorPage />} />
    </Routes>
  </Router>
);

export default App;