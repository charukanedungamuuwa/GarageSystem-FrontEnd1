import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Pages/AuthContext';
import { Button, Flex, Tooltip, message } from 'antd';

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    logout();
    
    message.success("LogOut Succesfully");
    
    navigate('/newhome'); // Redirect to homepage after logout
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <div className="bg-neutral-400 h-16 w-full flex items-center pr-9 fixed z-10">
      <div className="flex items-center ml-14">
        <img className="h-10" src="./images/Vector.png" alt="My Garage Logo" />
        <h1 className="text-sky-700 text-3xl ml-4 font-bold">My Garage</h1>
      </div>
      <div className="flex-1 flex justify-end items-center">
        <nav className={`md:flex hidden font-bold ${showMenu ? '' : 'hidden'}`}>
          <Link to="/newhome" className="text-black px-4 py-2 hover:bg-gray-300">
            Home
          </Link>
          <Link to="/aboutus" className="text-black px-4 py-2 hover:bg-gray-300">
            About
          </Link>
          <Link to="/services" className="text-black px-4 py-2 hover:bg-gray-300">
            Services
          </Link>
          <Link to="/contactus" className="text-black px-4 py-2 hover:bg-gray-300">
            Contact
          </Link>
          
          {isLoggedIn && (
            <div className="ml-4   ">
               <Button onClick={toggleProfileDropdown}  className=' bg-sky-800 mt-1 items-center ' type="primary" shape="circle" icon={<UserOutlined />} />
              {/* <button onClick={toggleProfileDropdown} className=" focus:outline-none mt-2 items-center flex">
                <UserOutlined className="mr-2" />
                <span>Profile</span>
              </button> */}
              
              {showProfileDropdown && (
                <div className="  absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-10  ">
                  <Link to="/myprofile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    My Profile
                  </Link>
                  <hr className="border-gray-200" />
                  <button onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          {!isLoggedIn && (
            <Link to="/newlogin" className="ml-4 button is-primary flex items-center">
              Log In
            </Link>
          )}
        </nav>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <img
              className="h-9 bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
              src="./images/Subtract.png"
              alt="Menu Icon"
            />
          </button>
          {showMenu && (
            <div className="absolute top-16 right-0 mt-2 py-2 bg-white shadow-md rounded-md">
              <Link to="/newhome" className="block px-4 py-2 text-black hover:bg-gray-300">
                Home
              </Link>
              <Link to="#about" className="block px-4 py-2 text-black hover:bg-gray-300">
                About
              </Link>
              <Link to="#services" className="block px-4 py-2 text-black hover:bg-gray-300">
                Services
              </Link>
              <Link to="/myprofile" className="block px-4 py-2 text-black hover:bg-gray-300">
                Contact
              </Link>
              {isLoggedIn && (
                <div className="mt-2  ">
                  <Link to="/myprofile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    My Profile
                  </Link>
                  <hr className="border-gray-200" />
                  <button onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                    Logout
                  </button>
                </div>
              )}
              {!isLoggedIn && (
                <Link to="/newlogin" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                  Log In
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;