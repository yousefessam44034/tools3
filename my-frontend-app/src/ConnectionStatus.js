// src/components/ConnectionStatus.js

import React, { useEffect } from 'react';
import { checkBackendConnection } from './services/api';

const ConnectionStatus = () => {
  useEffect(() => {
    checkBackendConnection()
      .then(() => console.log('Connection check successful!'))
      .catch(error => console.error('Connection check failed:', error));
  }, []);

  return (
    <div>
      <h2>Connection Status</h2>
      <p>Check the console for the backend connection status.</p>
    </div>
  );
};

export default ConnectionStatus;
