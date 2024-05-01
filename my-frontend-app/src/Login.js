import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);

  const fade = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  const Navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      console.log(data);

      // Set the login status based on the response
      setLoginStatus(data.message);

      // Optionally, you can redirect the user to a different page on successful login
      if (data.message === 'Login successful') {
        // Redirect logic goes here
        if (data.user_type === 'doctor') {
          // Redirect to the DoctorPage
          Navigate('/doctor');
        } else {
          console.log('Navigating to patient page with username:', 'your_actual_username');
          Navigate('/patient', { state: { username: 'your_actual_username' } });
          // history.push('/other-page');
        }
      }

    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <animated.form style={fade}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </div>

        {loginStatus && (
          <div>
            <p style={{ color: loginStatus === 'Login successful' ? 'green' : 'red' }}>
              {loginStatus}
            </p>
          </div>
        )}
      </animated.form>
    </div>
  );
};

export default Login;
