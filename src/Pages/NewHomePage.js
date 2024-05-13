import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import { Button, Divider, Flex, Radio, Card, Typography, message } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import Footer from "../Components/Footer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePageFooter from "../Components/HomePageFooter";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Pages/AuthContext";
import "./newHomePage.css";
const cardStyle = {
  width: 620,
  height:260,
  borderRadius: 16,
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  marginBottom: 20,
  transition: "transform 0.3s",
  cursor: "pointer",
  backgroundColor: "#",
  position: "relative",
  overflow: "hidden",
};
const imgStyle = {
  display: "block",
  width: 273,
};

const NewHomePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  
  const handleMyAppointmentsClick = () => {
    if (isLoggedIn) {
      navigate("/appointments");
    } else {
      message.error("Please Login First");
      navigate("/newlogin");
    }
  };
  

  const handleMyVehiclesClick = () => {
    if (isLoggedIn) {
      navigate("/vehicles");
    } else {
      message.error("Please Login First");
      navigate("/newlogin");
    }
  };


  return (
    <>
      <NavBar />
      <div className="mr-16 ">
      <div className="flex flex-col md:flex-row   ">
        <div
          className="bg-cover bg-center h-screen size-1/2 md:ml-0 ml-64 	"
          style={{
            backgroundImage:
              "url('./images/sten-rademaker-UZUzvJEvKnI-unsplash.jpg')",
          }}
        >
          {/* Content of your component */}
        </div>
        
        <div className="mt-24 text-right  ">
        {isLoggedIn && (
        <div className=" animate-fadein p-8 font-extrabold text-[60px] bg-[#edf2f9] text-center ml-32 text-sky-600  border-r-32  "> <p>Welcome To MYGARAGE!</p></div>)}
          <div className="">
            <span className="text-[100px] font-bold	 text-sky-900">
              MAKE YOUR
            </span>
            <br />
            <span className="text-[100px] font-bold  text-sky-900">
              VEHICLE
            </span>
            <br />
            <span className="text-[100px] font-bold  text-sky-900">HAPPY</span>
          </div>
          <div className="w-[700px] text-[27px] text-left md:ml-72 ml-2 mt-16  font-serif font-bold">
            <p>
              Come to get briliant and customer friendly services for your
              valuable vehicles with higher customer satisfactions for least
              cost. We have multi talented workers for make your vehicle much
              better.
            </p>

           
          </div>
          
          <div className="">
          
            {" "}
            {isLoggedIn ? null : (
            <Link to="/newlogin">
              <Button
                className="w-[160px]  mt-16  bg-sky-900	font-bold"
                type="primary"
                shape="round"
              >
                Login <ArrowRightOutlined />
              </Button>
            </Link>
          )}
          </div>

          <div className="">
          {isLoggedIn ? null : (
            <Link to="/newsignup">
              {" "}
              <Button
                className="w-[160px]  mt-8  bg-sky-900	font-bold"
                type="primary"
                shape="round"
              >
                Sign Up <ArrowRightOutlined />
              </Button>
            </Link>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:grid grid-cols-2  place-items-center  ">
        <div className="  size-1/2  ">
          <Card
          className="card-container "
            hoverable
            style={cardStyle}
            styles={{
              body: {
                padding: 0,
                overflow: "hidden",
              },
            }}
          >
            <Flex justify="space-between">
              <img alt="avatar" src="./images/services.jpg" style={imgStyle} className="object-contain" />
              <Flex
                vertical
                align="flex-end"
                justify="space-between"
                style={{
                  padding: 32,
                }}
              >
                <div >
                <Typography.Title level={3} >
                  Explore our range of services designed to keep your vehicle in top condition. 
                </Typography.Title></div>
                <Link to="/services">
                  <Button
                    className="bg-sky-900	font-bold"
                    type="primary"
                    href="https://ant.design"
                    target="_blank "
                  >
                    Services
                  </Button>
                </Link>
              </Flex>
            </Flex>
          </Card>
        </div>

        <div className=" mt-20 ">
         {isLoggedIn ? 
          <Card
            hoverable
            style={cardStyle}
            styles={{
              body: {
                padding: 0,
                overflow: "hidden",
              },
            }}
           >
            <Flex justify="space-between">
              <img alt="avatar" className="object-contain" src="./images/myvehicle.jpg" style={imgStyle}  />
              <Flex
                vertical
                align="flex-end"
                justify="space-between"
                style={{
                  padding: 32,
                }}
              >
                <Typography.Title level={3}>
                  Access information about your vehicles all in one place
                </Typography.Title>
                
                  {" "}
                  <Button
                    className="bg-sky-900	font-bold "
                    type="primary"
                    
                    target="_blank"
                    onClick={handleMyVehiclesClick}
                  >
                    My Vehicles
                  </Button>
                
              </Flex>
            </Flex>
          </Card> : ( 
          <Card
          hoverable
          style={cardStyle}
          styles={{
            body: {
              padding: 0,
              overflow: "hidden",
            },
          }}
         >
          <Flex justify="space-between">
            <img alt="avatar" className="object-contain" src="./images/why.jpg" style={imgStyle}  />
            <Flex
              vertical
              align="flex-end"
              justify="space-between"
              style={{
                padding: 32,
              }}
            >
              <Typography.Title level={3}>
              Discover the Reasons Behind Our Trusted Reputation
              </Typography.Title>
              
                {" "}
                <Button
                  className="bg-sky-900	font-bold "
                  type="primary"
                  
                  target="_blank"
                  onClick={() => navigate("/whyus")}
                >
                  Why Choose Us
                </Button>
              
            </Flex>
          </Flex>
        </Card>
          
          )}
        </div>
        <div className="  size-1/2 ">
        {isLoggedIn ? 
          <Card
            hoverable
            style={cardStyle}
            styles={{
              body: {
                padding: 0,
                overflow: "hidden",
              },
            }}
          >
            <Flex justify="space-between">
              <img alt="avatar" className="object-contain" src="./images/appointment.jpg" style={imgStyle} />
              <Flex
                vertical
                align="flex-end"
                justify="space-between"
                style={{
                  padding: 32,
                }}
              >
                <Typography.Title level={3}>
                  View and manage service schedule and receive reminders for important maintenance tasks. 
                </Typography.Title>
                
                  <Button
                    className="bg-sky-900	font-bold"
                    type="primary"
                   
                    target="_blank"
                    onClick={handleMyAppointmentsClick}
                  >
                    My Appointments
                  </Button>
                
              </Flex>
            </Flex>
          </Card> : (  
          <Card
            hoverable
            style={cardStyle}
            styles={{
              body: {
                padding: 0,
                overflow: "hidden",
              },
            }}
          >
            <Flex justify="space-between">
              <img alt="avatar" className="object-contain" src="./images/contactus.jpg" style={imgStyle} />
              <Flex
                vertical
                align="flex-end"
                justify="space-between"
                style={{
                  padding: 32,
                }}
              >
                <Typography.Title level={3}>
                friendly and inviting, encouraging users to reach out for assistance or information
                </Typography.Title>
                
                  <Button
                    className="bg-sky-900	font-bold"
                    type="primary"
                   
                    target="_blank"
                    onClick={() => navigate("/contactus")}
                  >
                    Contact Us
                  </Button>
                
              </Flex>
            </Flex>
          </Card>
        )}
        </div>

        <div className=" mt-20 ">
          <Card
            hoverable
            style={cardStyle}
            styles={{
              body: {
                padding: 0,
                overflow: "hidden",
              },
            }}
          >
            <Flex justify="space-between">
              <img
                alt="avatar"
                src="./images/aboutus.jpg"
                style={imgStyle}
                className="object-contain"
               
              />
              <Flex
                vertical
                align="flex-end"
                justify="space-between"
                style={{
                  padding: 32,
                }}
              >
                <Typography.Title level={3}>
                  Learn more about our garage and our commitment to customer satisfaction. 
                </Typography.Title>
                <Button
                  className="bg-sky-900	font-bold"
                  type="primary"
                  href="/aboutus"
                  target="_blank"
                >
                 About US
                </Button>
              </Flex>
            </Flex>
          </Card>
        </div>
      </div>
      <div className="h-100">
        
      </div>
      
      </div>
      <HomePageFooter />
    </>
  );
};

export default NewHomePage;
