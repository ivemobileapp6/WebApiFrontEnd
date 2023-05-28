import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function Google() {
  const responseMessage = async (response) => {
    try {
      const result = await axios.post('YOUR_SERVER_GOOGLE_LOGIN_ENDPOINT', {
        id_token: response.tokenId,
      });

      if (result.data && result.data.userId && result.data.userType) {
        console.log('UserId:', result.data.userId);
        console.log('UserType:', result.data.userType);
        // Handle successful login (e.g., store user information or redirect)
      } else {
        throw new Error('UserId or UserType not found in response data');
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
      <h2>React Google Login</h2>
      <br />
      <br />
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    </div>
  );
}

export default Google;