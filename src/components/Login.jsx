// // import React, { useState } from 'react';
// // import axios from 'axios';

// // const Login = ({ onLogin }) => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const response = await axios.post('https://webapiassignment.ivemobileapp6.repl.co/auth', {
// //         email: email,
// //         password: password,
// //       });

// //       const token = response.data.token;
// //       const userEmail = response.data.email;
// //       console.log('Login successful, token:', token);

// //       localStorage.setItem('authToken', token);
// //       localStorage.setItem('userEmail', userEmail);

// //       onLogin(token, userEmail);
// //     } catch (error) {
// //       if (error.response) {
// //         setError(error.response.data);
// //       } else {
// //         setError('Error connecting to the server.');
// //       }
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Login</h2>
// //       <form onSubmit={handleSubmit}>
// //         <div>
// //           <label htmlFor="email">Email:</label>
// //           <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
// //         </div>
// //         <div>
// //           <label htmlFor="password">Password:</label>
// //           <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
// //         </div>
// //         {error && <p>{error}</p>}
// //         <button type="submit">Login</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Login;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate  } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const navigate = useNavigate();

//   const onChangeEmail = (e) => setEmail(e.target.value);
//   const onChangePassword = (e) => setPassword(e.target.value);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('https://webapiassignment.ivemobileapp6.repl.co/auth', { email, password });
//      localStorage.setItem('token', response.data);
//       setSuccessMessage('Welcome!');
//       setErrorMessage('');
//       // Redirect to the desired page after successful login
//       setTimeout(() => {
//         navigate('/addcat');
//       }, 2000);
//     } catch (error) {
//       setSuccessMessage('');
//       setErrorMessage(
//         error.response && error.response.data
//           ? error.response.data
//           : 'An error occurred during login.'
//       );
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={onChangeEmail}
//           required
//         />
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={onChangePassword}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//        {errorMessage && <p>{errorMessage}</p>}
//       {successMessage && (
//         <div>
//           <h3>Welcome to the website!</h3>
//           <p>You have successfully logged in.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Google from './Google'


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setuserId] = useState('');

  const navigate = useNavigate();


  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://webapiassignment.ivemobileapp6.repl.co/auth', { email, password });

      if (response.data && response.data.token) {
        console.log('JWT Token:', response.data.token); // Print the JWT token
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

