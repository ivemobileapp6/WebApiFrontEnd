import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

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
        // Handle successful login (e.g., store user information or redirect)
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
        clientId="284165840531-sbvorfpuclou0uledr9b0nqm8hnaodp6.apps.googleusercontent.com" // Replace with your actual Google client ID
        onSuccess={responseMessage}
        onError={errorMessage} />
    </div>
  );
}

export default Google;