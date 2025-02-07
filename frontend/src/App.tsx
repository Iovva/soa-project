import './App.css';
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import AuthProvider from "./AuthContext.tsx";

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <h1>🎶 Welcome to ConcertHub 🎶</h1>
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}

export default App;