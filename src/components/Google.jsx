import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Google() {
  const responseMessage = async (response) => {
    console.log('Google login response:', response);
    console.log('Google ID:', response.googleId);

    try {
      const result = await axios.post('https://webapiassignment.ivemobileapp6.repl.co/auth/google', {
        id_token: response.credential,
      });

      if (result.data && result.data.userId && result.data.userType) {
        console.log('UserId:', result.data.userId);
        console.log('UserType:', result.data.userType);
        console.log('Token:', result.data.token);
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('UserId', result.data.userId);
        setTimeout(() => {
          navigate('/addcat');
        }, 2000);
      } else {
        throw new Error('Google ID or User Type not found in response data');
      }
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <div>
      <br />
      <br />
      <br />

      <h2>Google Login</h2>
      <br />
      <br />
      <GoogleLogin
        clientId="284165840531-sbvorfpuclou0uledr9b0nqm8hnaodp6.apps.googleusercontent.com"
        onSuccess={responseMessage}
        onError={errorMessage} />
    </div>
  );
}

export default Google;