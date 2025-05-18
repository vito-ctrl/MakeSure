import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const userRole = localStorage.getItem('userRole');
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl">
            {userRole === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-green-400">
            Welcome, {userData.name || 'User'}
          </span>
          <Link 
            to="/logout" 
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors duration-300"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;