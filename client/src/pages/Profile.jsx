import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    role: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    // Load user data from localStorage (in a real app, you'd fetch from API)
    const storedUserData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (storedUserData && Object.keys(storedUserData).length > 0) {
      setUserData(storedUserData);
      setEditedData(storedUserData);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would make an API call here to update the user profile
    // For this demo, we'll just update localStorage
    
    try {
      // Update local storage
      localStorage.setItem('userData', JSON.stringify(editedData));
      
      // Update state
      setUserData(editedData);
      setIsEditing(false);
      
      // Show success message
      setMessage({ 
        text: 'Profile updated successfully!',
        type: 'success'
      });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (error) {
      setMessage({ 
        text: 'Failed to update profile.',
        type: 'error'
      });
    }
  };

  // Determine message style based on type
  const messageStyle = message.type === 'success' 
    ? 'bg-green-100 text-green-800 border-green-300'
    : 'bg-red-100 text-red-800 border-red-300';

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-green-600 text-white p-6">
            <h1 className="text-2xl font-bold">User Profile</h1>
          </div>
          
          {message.text && (
            <div className={`${messageStyle} p-4 border-l-4`}>
              {message.text}
            </div>
          )}
          
          <div className="p-6">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editedData.name || ''}
                    onChange={handleChange}
                    className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-green-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editedData.email || ''}
                    onChange={handleChange}
                    className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-green-500"
                    disabled
                  />
                  <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={editedData.phone || ''}
                    onChange={handleChange}
                    className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-green-500"
                  />
                </div>
                
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="mb-6 flex justify-center">
                  <div className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-2xl font-bold">
                    {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-b pb-2">
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-semibold">{userData.name}</p>
                    </div>
                    
                    <div className="border-b pb-2">
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold">{userData.email}</p>
                    </div>
                    
                    <div className="border-b pb-2">
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-semibold">{userData.phone}</p>
                    </div>
                    
                    <div className="border-b pb-2">
                      <p className="text-sm text-gray-600">Role</p>
                      <p className="font-semibold capitalize">{userData.role}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;