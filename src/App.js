import React,{useState,useEffect}from 'react';
import { Routes, Route } from 'react-router-dom';
import NewHomePage from './Pages/NewHomePage';
import ProfilePage from './Pages/ProfilePage';
import HomePageFooter from './Components/HomePageFooter';
import Services from './Pages/Services';
import Footer from './Components/Footer';
import NewLogin from './Pages/NewLogin';
import NewSignUp from './Pages/NewSignUp';
import Vehicles from './Pages/Vehicles';
import Appointments from './Pages/Appointments';
import { AuthProvider } from './Pages/AuthContext'; // Correct import path
import ForgetPassword from "./Pages/ForgetPassword";
import PasswordResetPage from "./Pages/PasswordResetPage";
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import WhyUs from './Pages/WhyUs';
import AddGarageService from './Pages/AddGarageService';


function App() {
 

  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<NewHomePage />} />
      <Route path="/myprofile" element={<ProfilePage />} />
      <Route path="/homefooter" element={<HomePageFooter />} />
      <Route path="/services" element={<Services />} />
      <Route path="/footer" element={<Footer />} />
      <Route path="/newlogin" element={<NewLogin  />} />
      <Route path="/newsignup" element={<NewSignUp />} />
      <Route path="/newhome" element={<NewHomePage />} />
      <Route path="/vehicles" element={<Vehicles />} />
      <Route path="/aboutus" element={<AboutUs />} />
       <Route path="/contactus" element={<ContactUs />} />
       <Route path="/whyus" element={<WhyUs />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/addgarageservice" element={<AddGarageService />} />
      <Route path="/login" element={<NewLogin  />} />
        <Route  path="/reset-password" element={<PasswordResetPage/>}/>
       
        <Route  path="/reset-password/:token" element={<PasswordResetPage/>}/>
    </Routes>
    </AuthProvider>
  );
}

export default App;