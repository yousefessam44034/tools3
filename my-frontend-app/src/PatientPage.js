import React, { useState, useEffect } from 'react';

const PatientPage = ({ location }) => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [message, setMessage] = useState(location?.state?.message || "Default message if not provided");
  const [username, setUsername] = useState(location?.state?.username || '');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null); // New state to track fetch errors
  const [selectedPatientAppointments, setSelectedPatientAppointments] = useState([]);
  const [appointmentIdToDelete, setAppointmentIdToDelete] = useState(''); // Add this line for the new state
  const [patientUsernameInput, setPatientUsernameInput] = useState('');
  const [daySlotInput, setDaySlotInput] = useState('');
  const [timeSlotInput, setTimeSlotInput] = useState('');

  const handleBookAppointmentWithInputs = async () => {
    try {
      // Use the input values instead of state values
      const response = await fetch('http://localhost:5000/patient_appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patient_username: patientUsernameInput,
          doctor_username: selectedDoctor,
          day_of_week: daySlotInput,
          time_slot: timeSlotInput,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to book appointment');
      }

      const data = await response.json();
      console.log(data); // Handle success message or other logic as needed

      // Refetch patient's appointments after booking
      fetchPatientAppointments(patientUsernameInput);
    } catch (error) {
      console.error('Error booking appointment:', error.message);
    }
  };

  useEffect(() => {
    // Fetch available doctors and patients when the component mounts
    fetchAvailableDoctors();
    fetchPatients();
  }, []);

  useEffect(() => {
    // Fetch available doctors when the component mounts
    fetchAvailableDoctors();
    // Fetch all patients for the dropdown
    fetchPatients();
  }, []); // The empty dependency array ensures these effects run once when the component mounts

  const fetchAvailableDoctors = async () => {
    try {
      const response = await fetch('http://localhost:5000/get_doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch available doctors');
      }

      const data = await response.json();
      setDoctors(data.doctors || []); // Ensure doctors is initialized as an array
    } catch (error) {
      console.error('Error fetching available doctors:', error.message);
    }
  };

  const fetchDoctorAppointments = async (doctorUsername) => {
    try {
      const response = await fetch('http://localhost:5000/view_doctor_slots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctor_username: doctorUsername,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch doctor appointments');
      }

      const data = await response.json();
      setDoctorAppointments(data.slots || []); // Ensure doctorAppointments is initialized as an array
    } catch (error) {
      console.error('Error fetching doctor appointments:', error.message);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost:5000/get_patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch patients');
      }

      const data = await response.json();
      setPatients(data.patients || []); // Ensure patients is initialized as an array
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching patients:', error.message);
      setPatients([]); // Set patients to an empty array on fetch failure
      setError('Failed to fetch patients. Please try again.'); // Set an error message
    }
  };

  const handleDeleteAppointment = async () => {
    try {
      // Check if appointmentIdToDelete is not empty
      if (!appointmentIdToDelete) {
        console.error('Appointment ID cannot be empty');
        return;
      }

      const response = await fetch('http://localhost:5000/cancel_appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patient_username: selectedPatient,
          appointment_ids: [appointmentIdToDelete],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete appointment');
      }

      const data = await response.json();
      console.log(data); // Handle success message or other logic as needed

      // Update the UI to reflect the deleted appointment
      // You may need to update the state or refetch data depending on your application's structure
      // Refetch patient's appointments after deleting
      fetchPatientAppointments(selectedPatient);
    } catch (error) {
      console.error('Error deleting appointment:', error.message);
    }
  };


  const fetchPatientAppointments = async (patientUsername) => {
    try {
      const response = await fetch('http://localhost:5000/get_patient_appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patient_username: patientUsername,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch patient appointments');
      }

      const data = await response.json();

      // Check if the 'appointments' property exists in the response data
      if ('appointments' in data) {
        setSelectedPatientAppointments(data.appointments);
      } else {
        console.error('Error fetching patient appointments: Appointments data is undefined');
      }
    } catch (error) {
      console.error('Error fetching patient appointments:', error.message);
    }
  };

  const handlePatientChange = async (e) => {
    const selectedPatient = e.target.value;
    setSelectedPatient(selectedPatient);

    // Fetch patient's information when a patient is selected
    if (selectedPatient) {
      // Update the state with the selected patient's username
      setUsername(selectedPatient);
      // Fetch patient's appointments when a patient is selected
      fetchPatientAppointments(selectedPatient);
    } else {
      // Clear patient's information when no patient is selected
      setUsername('');
      setSelectedPatientAppointments([]);
    }
  };

  const handleDoctorChange = (e) => {
    const selectedDoctor = e.target.value;
    setSelectedDoctor(selectedDoctor);

    // Fetch doctor's appointments when a doctor is selected
    if (selectedDoctor) {
      fetchDoctorAppointments(selectedDoctor);
    } else {
      // Clear doctor's appointments when no doctor is selected
      setDoctorAppointments([]);
    }
  };

  const handleBookAppointment = async (dayOfWeek, timeSlot) => {
    try {
      const response = await fetch('http://localhost:5000/patient_appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patient_username: username, // Use the selected patient's username
          doctor_username: selectedDoctor,
          day_of_week: dayOfWeek,
          time_slot: timeSlot,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to book appointment');
      }

      const data = await response.json();
      console.log(data); // Handle success message or other logic as needed

      // Refetch patient's appointments after booking
      fetchPatientAppointments(username);
    } catch (error) {
      console.error('Error booking appointment:', error.message);
    }
  };


  return (
    <div>
      <h2>                   hola amegos {username}</h2>
      {/* Dropdown for selecting a patient */}
      <label>Select Patient:</label>
      <select onChange={handlePatientChange}>
        <option value="">Select Patient</option>
        {error ? ( // Display an error message if there's an issue fetching patients
          <option value="" disabled>
            {error}
          </option>
        ) : (
          patients.map((patient, index) => (
            <option key={index} value={patient}>
              {patient}
            </option>
          ))
        )}
      </select>

      <p>Patient's Appointments</p>
      <table border="1">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Day of Week</th>
            <th>Time Slot</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {selectedPatientAppointments.length > 0 ? (
            selectedPatientAppointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.appointment_id}</td>
                <td>{appointment.day_of_week}</td>
                <td>{appointment.time_slot}</td>
                <td>{appointment.status}</td>
                <td>
                  {appointment.status && (
                    <>
                      <button
                        onClick={() => handleBookAppointmentWithInputs(appointment.day_of_week, appointment.time_slot)}
                      >
                        Book
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No appointments for the selected patient</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Text box and button for appointment deletion */}
      <div>
        
        <label>Enter Appointment ID to Delete:</label>
        <input
          type="text"
          value={appointmentIdToDelete}
          onChange={(e) => setAppointmentIdToDelete(e.target.value)}
        />
        <button onClick={handleDeleteAppointment}>Delete Appointment</button>
      </div>

      {/* Input boxes for booking an appointment */}
      <div>
      <br/>
      <br/>
        <label>Patient Username:</label>
        <input
          type="text"
          value={patientUsernameInput}
          onChange={(e) => setPatientUsernameInput(e.target.value)}
        />
      </div>
      <div>
        <label>Day Slot:</label>
        <input
          type="text"
          value={daySlotInput}
          onChange={(e) => setDaySlotInput(e.target.value)}
        />
      </div>
      <div>
        <label>Time Slot:</label>
        <input
          type="text"
          value={timeSlotInput}
          onChange={(e) => setTimeSlotInput(e.target.value)}
        />
      </div>

      {/* Button to book appointment with input values */}
      <button onClick={handleBookAppointmentWithInputs}>Book Appointment</button>
      <br/>
      <br/>
      <br/>
      {/* Dropdown for selecting a doctor */}
      <label>Select Doctor:  </label>
      <select onChange={handleDoctorChange}>
        <option value="">Select Doctor</option>
        {doctors.map((doctor, index) => (
          <option key={index} value={doctor}>
            {doctor}
          </option>
        ))}
      </select>

      <p>Doctor's Appointments</p>
      <table border="1">
        <thead>
          <tr>
            <th>Day of Week</th>
            <th>Time Slot</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {doctorAppointments.length > 0 ? (
            doctorAppointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.day_of_week}</td>
                <td>{appointment.time_slot}</td>
                <td>{appointment.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No appointments for the selected doctor</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        <h2>Hello, {username} (User Type: Patient)</h2>
        {/* Rest of the component remains the same */}
      </div>
    </div>
  );
};
export default PatientPage;
