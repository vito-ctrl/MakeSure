import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./pages/auth/ProtectedRoutes";

import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Admin from "./pages/Admin";  
import User from "./pages/User";
import Profile from "./pages/Profile";
import Logout from "./components/Logout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="admin">
            <Admin />
          </ProtectedRoute>  
        }/>

        <Route path="/user" element={
          <ProtectedRoute requiredRole="user">
            <User/>
          </ProtectedRoute>
        }/>
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }/>

        {/* Catch-all route - redirect to appropriate page based on role */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}