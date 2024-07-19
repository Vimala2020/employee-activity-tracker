import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './Firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

const EmployeeLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/employee/dashboard');
      toast.success('Employee successfully logged in');
    } catch (error) {
      setError('Invalid credentials');
      toast.error('Invalid Credentials');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (attempts < 3) {
      try {
        await sendPasswordResetEmail(auth, resetEmail);
        toast.success('Password reset email sent');
        setShowForgotPassword(false);
        setAttempts(0);
      } catch (error) {
        setError('Error sending password reset email');
        toast.error('Error sending password reset email');
        setAttempts(attempts + 1);
      }
    } else {
      toast.error('Maximum attempts reached. Please try again later.');
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
        <div className="text-center mt-4">
          <button
            onClick={() => setShowForgotPassword(true)}
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      </div>

      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl mb-6 text-center">Reset Password</h2>
            <form onSubmit={handleForgotPassword}>
              <div className="mb-4">
                <label htmlFor="resetEmail" className="block text-gray-700 mb-2">Registered Email:</label>
                <input
                  type="email"
                  id="resetEmail"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Send Reset Link
              </button>
            </form>
            <div className="text-center mt-4">
              <button
                onClick={() => setShowForgotPassword(false)}
                className="text-blue-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeLogin;
