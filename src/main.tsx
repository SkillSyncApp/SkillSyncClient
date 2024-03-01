import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
import App from './App.tsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  //TODO
  <GoogleOAuthProvider clientId = "1082363938325-knbmg18ijtmnqilhpr6k6rae35mda8rs.apps.googleusercontent.com">
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>  
  </GoogleOAuthProvider>

)
