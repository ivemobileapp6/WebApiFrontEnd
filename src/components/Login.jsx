/**
 * Login component
 * 
 * The component provides a login form for users. 
 * It also includes a Google login from the `Google` component. 
 * When users submit the form, the component sends an HTTP POST request to the server via the axios 
 * library for authentication. 
 * A JWT token, user type etc. are stored in the localStorage when the user is successfully logged in.
 * Page will reload automatically after login 
 */

import React, { useState } from 'react';
import axios from 'axios';
import Google from './Google'


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setuserId] = useState('');

  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://webapiassignment.ivemobileapp6.repl.co/auth', { email, password });

      if (response.data && response.data.token) {
        console.log('JWT Token:', response.data.token); // Print the JWT token
        console.log(' userId:', response.data.userId); // Print the JWT token

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userType', response.data.userType); // Store user type
        localStorage.setItem('userName', response.data.name);
        localStorage.setItem('userId', response.data.userId);

        setuserId(response.data.userId)
        setUserName(response.data.name); // Update the user's name
        setSuccessMessage('Welcome!');
        setErrorMessage('');
        // Redirect to the desired page after successful login
        window.location.reload();

      } else {
        throw new Error('Token not found in response data');
      }
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage(
        error.response && error.response.data
          ? error.response.data
          : 'An error occurred during login.'
      );
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={onChangeEmail}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={onChangePassword}
          required
        />
        <button type="submit">Login</button>
      </form>

      <div>
        <Google />
      </div>

      {errorMessage && <p>{errorMessage}</p>}
      {successMessage && (
        <div>
          <h3>Welcome to the website, {userName}!</h3>
          <p>You have successfully logged in.</p>
        </div>
      )}
    </div>
  );
};

export default Login;

