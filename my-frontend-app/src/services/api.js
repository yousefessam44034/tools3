// src/services/api.js

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://backend:7000';

export const checkBackendConnection = () => {
  return new Promise((resolve, reject) => {
    fetch(`${backendUrl}/check_connection`)
      .then(response => {
        if (response.ok) {
          console.log('Connected to the backend!');
          resolve();
        } else {
          console.error('Failed to connect to the backend. Status:', response.status);
          reject(new Error(`Failed to connect to the backend. Status: ${response.status}`));
        }
      })
      .catch(error => {
        console.error('Error connecting to the backend:', error);
        reject(error);
      });
  });
};
