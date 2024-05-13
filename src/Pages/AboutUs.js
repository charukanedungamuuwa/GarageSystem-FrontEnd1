import React from 'react';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import HomePageFooter from '../Components/HomePageFooter';

function AboutUs() {
  return (
<>
<NavBar></NavBar>
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-8 sm:px-10 sm:py-12">
          <div className="text-white text-4xl font-bold mb-2">About Us</div>
          <p className="text-white text-lg">
            What is a Garage?
          </p>
        </div>
        <div className="p-6 sm:p-8">
          <p className="text-lg text-gray-800 mb-6">
            A garage is a building or enclosed space primarily used for storing vehicles, such as cars, motorcycles, bicycles, and sometimes tools or equipment related to vehicle maintenance or repair. Garages can be attached to a house, part of a residential property, or standalone structures located near homes or commercial areas.
          </p>
          <p className="text-lg text-gray-800 mb-6">
            A car garage is a specialized facility designed for storing, maintaining, and repairing automobiles. It serves as a crucial hub for vehicle owners and mechanics, providing a range of services to keep vehicles running smoothly and safely.
          </p>
          <div className="mb-8 text-gray-800">
            <p className="mb-4 text-lg font-bold">Features:</p>
            <ul className="list-disc pl-6">
              <li className="mb-2">Vehicle Storage: The primary function of a car garage is to provide a secure and sheltered space for cars, protecting them from weather elements like rain, snow, and sun damage.</li>
              <li className="mb-2">Maintenance Services: Car garages offer various maintenance services such as oil changes, brake inspections, tire rotations, and engine tune-ups. These services help ensure that vehicles are in optimal condition for safe driving.</li>
              <li className="mb-2">Repair Services: In addition to maintenance, garages perform repairs on vehicles that have mechanical issues. This includes fixing engine problems, electrical issues, bodywork, and more.</li>
              <li className="mb-2">Diagnostic Equipment: Modern car garages are equipped with advanced diagnostic tools and equipment to identify and troubleshoot problems with vehicles' systems. This allows for accurate and efficient repairs.</li>
              <li className="mb-2">Experienced Mechanics: Skilled and certified mechanics work in car garages, providing expertise in diagnosing and fixing automotive issues. Their knowledge helps ensure vehicles are repaired correctly.</li>
              <li className="mb-2">Parts and Accessories: Garages often stock a variety of car parts and accessories, making it convenient for customers to purchase replacement parts or upgrade their vehicles.</li>
              <li className="mb-2">Customer Service: Good car garages prioritize customer service, providing clear explanations of repairs, cost estimates, and timelines. They aim to make the process of getting a car serviced as smooth and hassle-free as possible for their clients.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>


<Footer></Footer>
    </>
  );
}

export default AboutUs;
