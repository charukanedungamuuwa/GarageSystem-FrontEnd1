import React, { useState ,useEffect} from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input ,Modal,message}  from "antd";
import "./NewLogin.css";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from '../Pages/AuthContext';
import PasswordResetRequest from "../Pages/PasswordResetRequest";


const NewLogin = () => {
   
  const [loading, setLoading] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  // useEffect(() => {
  //   console.log('isLoggedIn has changed:', isLoggedIn);
    
  // }, [isLoggedIn]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/auth/authenticate', values);
      if (response && response.data) {
        console.log('Login successful:', response.data);
        setLoading(false);
        const { token, email } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('email', email); 
        login(); 
      
       
        message.success('logged in Succesfully');
      navigate('/newhome');
      } else {
        // Handle invalid response or missing data
        console.error('Invalid response or missing data:', response);
        setLoading(false);
        
        message.error('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      
      message.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <>
         <NavBar />
         
      <div className="flex flex-col items-center md:flex-row">
        <div
          className="bg-cover bg-center h-screen size-1/2 inset-0"
          style={{
            backgroundImage:
              "url('./images/aaron-huber-KxeFuXta4SE-unsplash.jpg')",
            brightness: 2,
            height: "100vh",
          }}
        >
          <div className="text-white text-[40px] flex gap-x-8 justify-center pt-52">
            <img src="./images/Vector (1).png" alt="" />
            <span className="font-sans">My Garage</span>
          </div>
          <div className="flex justify-center mt-96">
            <img src="./images/Social media logo (1).png" alt="" />
            <img src="./images/Social media logo (2).png" alt="" />
            <img src="./images/Social media logo.png" alt="" />
          </div>
        </div>
        <div className="flex justify-center flex-1 items-center flex-col gap-16 mr-24 mb-56">
          <div>
            <span className="text-[39px] font-bold">Login</span><br />
            <span className="text-[20px] ">Please fill your information below.</span>
          </div>
          <div>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input
                  className="h-12 w-96"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                className="relative top-[10px]"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  className="h-12 w-96"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item className="ml-16">
              
                <div className="text-center ">
          <Button
            type="link"
            onClick={() => setShowPasswordReset(true)}
          >
            Forgot password?
          </Button>
        </div>
      
      {/* Modal for Password Reset Request */}
      <Modal
        title="Reset Password"
        visible={showPasswordReset}
        onCancel={() => setShowPasswordReset(false)}
        footer={null}
      >
        <PasswordResetRequest />
      </Modal>
              </Form.Item>
              <Form.Item className="">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button w-96"
                  loading={loading}
                >
                  Log in
                </Button>
                <div className="flex mt-4 w-full ml-8 "> 
                <div className="">If You Don't Have An Account:</div>
                <div className="ml-4">
                <Link to="/newsignup" className="block text-center text-sky-600 ">
                  Register now!
                </Link></div></div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewLogin;