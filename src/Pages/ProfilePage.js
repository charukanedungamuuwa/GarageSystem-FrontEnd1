import React, { useState, useEffect } from 'react';
import NavBar from '../Components/NavBar.js';
import Footer from '../Components/Footer.js';
import './profilePage.css';
import axios from 'axios';
import { useAuth } from '../Pages/AuthContext';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const phoneRegex = /^0[0-9]{9}$/;
  // Fetch user profile based on email
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`http://localhost:8080/api/owner/getbyemail/${email}`, config);
      const vehiclesResponse = await axios.get(`http://localhost:8080/api/vehicle/owner/${response.data.userId}`, config);
      const numberOfVehicles = vehiclesResponse.data.length;

      const appointmentResponse = await axios.get(`http://localhost:8080/api/appointments/get/${response.data.userId}`, config);
      const numberOfAppointments = appointmentResponse.data.length;

      const updatedProfile = {
        ...response.data,
        numberOfVehicles: numberOfVehicles,
        numberOfAppointments:numberOfAppointments,
      };

      setUserProfile(updatedProfile); // Assuming response.data contains user profile details
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserProfile();
    }
  }, [isLoggedIn]); 

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      // Make API call to update user profile with userProfile data
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(`http://localhost:8080/api/owner/edit/${userProfile.userId}`, userProfile, config);
      console.log('User profile updated:', response.data);
      setEditMode(false);
      // Optionally, you can refetch the user profile after updating
      fetchUserProfile();
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const handleCancelClick = () => {
    // Reset the userProfile data
    fetchUserProfile();
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };
  const handleVehicleClick = () => {
    // Redirect to the vehicles page
    navigate('/vehicles');
  };
  const handleAppointmentClick = () => {
    // Redirect to the vehicles page
    navigate('/appointments');
  };
  const handleServiceClick = () => {
    // Redirect to the vehicles page
    navigate('/services');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-3xl text-center font-semibold text-gray-800 mb-6">My Profile</h2>
          {/* <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <img src="./images/Ellipse 1.png" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button className="btn btn-primary ml-4">Edit Pic</button>
          </div> */}
          <h1 className="text-2xl text-center  font-semibold text-gray-800 mb-6">{`${userProfile?.firstName} ${userProfile?.lastName}`}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-200 rounded-lg p-4 flex flex-col justify-center items-center">
              <span className="text-lg font-semibold">{userProfile?.numberOfVehicles}</span>
              <span className="text-gray-600">Vehicles</span>
            </div>
            <div className="bg-gray-200 rounded-lg p-4 flex flex-col justify-center items-center">
              <span className="text-lg font-semibold">238</span>
              <span className="text-gray-600">Completed Services</span>
            </div>
            <div className="bg-gray-200 rounded-lg p-4 flex flex-col justify-center items-center">
              <span className="text-lg font-semibold">{userProfile?.numberOfAppointments}</span>
              <span className="text-gray-600">Ongoing</span>
            </div>
          </div>
          <div className="border-b border-gray-300 mb-6"></div>
          <div className="flex justify-between">
            <button  onClick={handleVehicleClick} className="btn btn-secondary"> My Vehicles</button>
            <button onClick={handleAppointmentClick} className="btn btn-secondary">Appointments</button>
            <button onClick={handleServiceClick} className="btn btn-secondary">Services</button>
            <button onClick={handleVehicleClick} className="btn btn-secondary">Add Vehicles</button>
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Basic Information</h3>
            {!editMode ? (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input type="text" id="firstName" className="input-field" placeholder="First Name" value={userProfile?.firstName} disabled />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input type="text" id="lastName" className="input-field" placeholder="Last Name" value={userProfile?.lastName} disabled />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" className="input-field" placeholder="Enter Your Email" value={userProfile?.email} disabled />
                  </div>
                  <div>
                    <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number</label>
                    <input type="tel" id="contactNumber" className="input-field" placeholder="Contact Number" value={userProfile?.contactNumber} disabled />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <input type="text" id="address" className="input-field" placeholder="Address" value={userProfile?.address} disabled />
                  </div>
                </div>
              </div>
            ) : (
              <form>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input type="text" id="firstName" className={`input-field ${editMode ? 'input-editable' : ''}`} placeholder="First Name" value={userProfile?.firstName} onChange={handleChange} name="firstName" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input type="text" id="lastName" className={`input-field ${editMode ? 'input-editable' : ''}`} placeholder="Last Name" value={userProfile?.lastName} onChange={handleChange} name="lastName" />
                  </div>
                  <div>                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" className="input-field" placeholder="Enter Your Email" value={userProfile?.email} disabled/>
                  </div>
                  <div>
                    <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number</label>
                    <input type="tel" id="contactNumber" className={`input-field ${editMode ? 'input-editable' : ''}`} placeholder="Contact Number" value={userProfile?.contactNumber} onChange={handleChange} name="contactNumber" />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <input type="text" id="address" className={`input-field ${editMode ? 'input-editable' : ''}`} placeholder="Address" value={userProfile?.address} onChange={handleChange} name="address" />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button type="button" className="btn btn-secondary mr-2" onClick={handleSaveClick}>Save</button>
                  <button type="button" className="btn btn-secondary" onClick={handleCancelClick}>Cancel</button>
                </div>
              </form>
            )}
            {!editMode && (
              <div className="mt-6 flex justify-end">
                <button type="button" className="btn btn-secondary" onClick={handleEditClick}>Edit</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
