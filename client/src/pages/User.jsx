import React from 'react';
import NavBar from '../components/Navbar';

export default function User() {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">User Dashboard</h1>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <p className="text-lg mb-4">
              Welcome to your user dashboard, <span className="font-semibold text-green-600">{userData.name}</span>!
            </p>
            
            <p className="text-gray-700 mb-2">
              This is your personal space where you can view and manage your account.
            </p>
            
            <div className="mt-6 flex justify-center">
              <button 
                onClick={() => window.location.href = '/profile'}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
              >
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}