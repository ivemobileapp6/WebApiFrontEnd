// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App';

// const root = document.getElementById('root');
// createRoot(root).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';

ReactDOM.render(
    <GoogleOAuthProvider clientId="284165840531-sbvorfpuclou0uledr9b0nqm8hnaodp6.apps.googleusercontent.com">
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </GoogleOAuthProvider>,
    document.getElementById('root')
);