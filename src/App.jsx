// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TransferCard from "./pages/TransferCard";
// import Register from "./pages/Register";
// import RegistrationSuccessful from "./pages/RegistrationSuccessful";
// import RedirectPage from "./pages/Redirect"; // Rename this if your file name is different

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root path to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Page Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Dashboard />} />
        <Route path="/transfer" element={<TransferCard/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
