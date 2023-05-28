import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = '284165840531-sbvorfpuclou0uledr9b0nqm8hnaodp6.apps.googleusercontent.com';

const GoogleLoginButton = () => {
  const onSuccess = (response) => {
    console.log('Login success:', response);
  };

  const onFailure = (response) => {
    console.log('Login failed:', response);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginButton;