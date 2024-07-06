import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock credentials
    const mockEmail = 'employee@example.com';
    const mockPassword = 'password123';

    if (email === mockEmail && password === mockPassword) {
      // Redirect to employee dashboard
      navigate('/employee/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center">Employee Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeLogin;

