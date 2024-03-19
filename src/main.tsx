import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient();

const googleClientId = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID;

if (!googleClientId) {
  throw new Error("Google Client ID is not defined in environment variables");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </GoogleOAuthProvider>
);
