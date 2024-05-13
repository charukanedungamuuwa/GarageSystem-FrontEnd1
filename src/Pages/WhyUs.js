import React from 'react';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';

const WhyUs = () => {
  return (
    <>
    <NavBar></NavBar><Footer></Footer>
    <div className="max-w-3xl mx-auto py-32">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Why Choose Us?</h2>
        <p className="text-lg text-gray-700 mb-8">
          Here are the reasons why you should choose our services:
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-sky-100 shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-900">Expertise You Can Trust</h3>
          <p className="text-gray-700">
            Our team of professionals brings years of experience and expertise to every project.
            We're dedicated to delivering top-notch service and results.
          </p>
        </div>

        <div className="bg-sky-100 shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-900">Tailored Solutions</h3>
          <p className="text-gray-700">
            We understand that every customer is unique. That's why we offer personalized solutions
            to meet your specific needs. Your satisfaction is our priority.
          </p>
        </div>

        <div className="bg-sky-100 shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-900">Quality Assurance</h3>
          <p className="text-gray-700">
            We pride ourselves on the quality of our work. From start to finish, we maintain the
            highest standards to ensure excellence in every project.
          </p>
        </div>

        <div className="bg-sky-100 shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-900">Customer Satisfaction</h3>
          <p className="text-gray-700">
            Our commitment to customer satisfaction is unwavering. We go above and beyond to exceed
            your expectations and earn your trust.
          </p>
        </div>

        <div className="bg-sky-100 shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-900">Transparent Communication</h3>
          <p className="text-gray-700">
            We believe in open and transparent communication. You'll always know what's happening
            with your project and have a direct line to our team.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default WhyUs;
