import React from "react";
import "./NewSignUp.css";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { Link } from "react-router-dom";

import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import VehicleOwnerServices from "../services/VehicleOwnerServices";
const NewSignUp = () => {
  const phoneRegex = /^0[0-9]{9}$/;
 
  const onFinish = async (values) => {
    try {
      // Call the service to add the vehicle owner
      const response = await VehicleOwnerServices.addVehicleOwner(values);
      if (response) {
       
        console.log("Registration successful:", response.data); // Log the success message
        // Optionally, show a success message to the user
        message.success('Register Succesfully');
   alert("Register Succesfully");
        window.location.href = "/newlogin";

      } 
      // else {
      //   console.error("Registration failed:", response.data); // Log the error message
      //   // Handle error, show message to user, etc.
      //   alert("not succesfull");
      // }
      
      
      // Oalert("aadadas");ptionally, you can redirect the user after successful registration
    } catch (error) {
      console.error("Registration failed:", error.message);
      
      message.error("Email is Exist.Enter Another Email")
      // Handle error, show message to user, etc.
    }
  };
  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject("Please input your Password!");
    }
  
    // Regular expressions to check for different criteria
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*]/.test(value);
  
    if (!(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && value.length >= 8)) {
      return Promise.reject(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
      );
    }
  
    return Promise.resolve();
  };

  return (
    <>
    <NavBar/>
    <Footer/>
      <div className="flex flex-col pb-24 items-center   md:flex-row md:pb-0 ">
        <div
          className="bg-cover bg-center h-screen size-1/2  	"
          style={{
            backgroundImage:
              "url('./images/aaron-huber-KxeFuXta4SE-unsplash.jpg')",

            brightness: 2,
            height: "100vh",
          }}
        >
          <div className=" text-white text-[40px]  flex gap-x-8 justify-center pt-52  ">
            <img src="./images/Vector (1).png" alt="" />
            <span className="font-sans">My Garage</span>
          </div>
          <div className="flex  justify-center  mt-96">
            <img src="./images/Social media logo (1).png" alt="" />
            <img src="./images/Social media logo (2).png" alt="" />
            <img src="./images/Social media logo.png" alt="" />
          </div>
        </div>

        <div className="flex  justify-center items-center mr-48 mb-24 flex-col gap-16 flex-1">
        <div className=" ">
            <span className="text-[39px] font-bold	">
              Sign Up<br></br>
            </span>
            <span className="text-[20px]">
              Please fill your information below.
            </span>
          </div>
          <div >
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                
              }}
              onFinish={onFinish}
            >
              <div className="flex gap-x-6">
                <Form.Item
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Firstname!",
                    },
                  ]}
                >
                  <Input
                    className="h-12 w-64"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Firstname"
                  />
                </Form.Item>

                <Form.Item
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your LastName!",
                    },
                  ]}
                >
                  <Input
                    className="h-12 w-64"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Lastname"
                  />
                </Form.Item>
              </div>

              <Form.Item
                className="relative top-[10px]"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                  {
                    type: "email",
                  
                  },{
                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input
                  className="h-12 w-[535px]"
                  prefix={<MailOutlined className="site-form-item-icon   " />}
                  placeholder="Email"
                />
              </Form.Item>

              <Form.Item
                className="relative top-[10px]"
                name="contactNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your Contact Number!",
                  },
                  {
                    pattern: phoneRegex,
                    message: 'Please enter a valid 10-digit phone number!',
                  },
                ]}
              >
                <Input
                  className="h-12 w-[535px]"
                  prefix={<PhoneOutlined className="site-form-item-icon   " />}
                  placeholder="Contact Number"
                />
              </Form.Item>

              <Form.Item
                className="relative top-[10px]"
                name="address"
                
                rules={[
                  {
                    required: true,
                    message: "Please input your Address!",
                  },
                ]}
              >
                <Input
                  className="h-12 w-[535px]"
                  prefix={<HomeOutlined className="site-form-item-icon   " />}
                  placeholder="Address"
                />
              </Form.Item>

              <Form.Item
                className="relative top-[10px]"
                name="password"
                
                rules={[
                  {
                    required: true,
                    
                  }, {
                    validator: validatePassword,
                  },
                ]}
              >
                <Input
                  className="h-12 w-[535px] "
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item className="relative top-[20px]">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <span>Allready Have an Account?</span>
                </Form.Item>

                <Link to="/newlogin" className="login-form-forgot " href="">
                  Log in to Account
                </Link>
              </Form.Item>

              <Form.Item className="relative top-[10px]">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button  w-[535px]"
                >
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewSignUp;
