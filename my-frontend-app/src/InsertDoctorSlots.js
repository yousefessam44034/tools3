import React, { useState } from 'react';
import axios from 'axios';

function InsertDoctorSlots() {
  const [formData, setFormData] = useState({
    doctor_username: '',
    day_of_week: '',
    time_slot: '',
    status: 'not_booked',
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInsertDoctorSlots = async () => {
    try {
      const response = await axios.post('http://localhost:5000/insert_doctor_slots', formData);
      if (response.data.message === "Doctor's slot added successfully") {
        setMessage("Doctor's slot added successfully");
      } else {
        setMessage('Failed to add doctor slot');
      }
    } catch (error) {
      console.error('Failed to add doctor slot:', error);
      setMessage('Failed to add doctor slot');
    }
  };

  return (
    <div>
      <h2>Insert Doctor Slots</h2>
      <form>
        <div>
          <label>Doctor Username:</label>
          <input
            type="text"
            name="doctor_username"
            value={formData.doctor_username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Day of the Week:</label>
          <input
            type="text"
            name="day_of_week"
            value={formData.day_of_week}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Time Slot:</label>
          <input
            type="text"
            name="time_slot"
            value={formData.time_slot}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleInsertDoctorSlots}>
          Add Slot
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default InsertDoctorSlots;
