import React from 'react';
import Footer from '../Components/Footer';
import NavBar from '../Components/NavBar';

function ContactUs() {
  return (

    <>
    <NavBar></NavBar>
    
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8  max-w-sm mx-auto ">
    <div className='mt-32'>
      <h2 className="text-2xl font-bold mb-4 text-center">Contact Information</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Email:</label>
        <p className="text-gray-900">www.mygarage.com</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Contact Number:</label>
        <p className="text-gray-900">0774674870</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Address:</label>
        <p className="text-gray-900">No: 18/2, Kottawa Road, Maharagama, Pannipitiya</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Facebook:</label>
        <p>
          <a
            href="https://www.facebook.com/lkkjk/lklookklolol"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.Facebook.com/lkkjk/lklookklolol
          </a>
        </p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Owner Name:</label>
        <p className="text-gray-900">Sasmitha Jayasooriya</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Register Id:</label>
        <p className="text-gray-900">9937875536</p>
      </div>
    </div>
    </div>
    <Footer></Footer>
    </>
  );
}

export default ContactUs;
