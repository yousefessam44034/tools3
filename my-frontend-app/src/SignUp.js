import React, { useState } from 'react';
import BirdsAnimation from './BirdsAnimation'; // Import the BirdsAnimation component
import './SignUp.css'; // Import the CSS file for styling

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPatient, setIsPatient] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleSignUp = async () => {
    try {
      // eslint-disable-next-line no-template-curly-in-string
      const response = await fetch('${process.env.REACT_APP_BACKEND_URL}/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          user_type: getUserType(),
        }),
      });

      const data = await response.json();

      console.log(data);

      // Set the registration status based on the response
      setRegistrationStatus(data.message);

      // Optionally, you can redirect the user to a different page on successful registration
      if (data.message === 'Registration successful') {
        // Redirect logic goes here
      }

    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const getUserType = () => {
    if (isPatient && isDoctor) {
      return 'both';
    } else if (isDoctor) {
      return 'doctor';
    } else {
      return 'patient';
    }
  };

  return (
    <div className="signup-container">
      <BirdsAnimation /> {/* Include the BirdsAnimation component here */}
      <h2>Sign Up</h2>
      <form>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div>
          <label>
            User Type:
            <input
              type="checkbox"
              checked={isPatient}
              onChange={() => setIsPatient(!isPatient)}
            />
            Patient
          </label>
          <label>
            <input
              type="checkbox"
              checked={isDoctor}
              onChange={() => setIsDoctor(!isDoctor)}
            />
            Doctor
          </label>
        </div>

        <div>
          <button type="button" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>

        {registrationStatus && (
          <div>
            <p>Registration Status: {registrationStatus}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default SignUp;
