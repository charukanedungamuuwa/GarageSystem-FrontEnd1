import React, { useState, useEffect } from "react";
import { Card, Modal, Form, Input, Select, Button ,message} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { useAuth } from "../Pages/AuthContext";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import { DatePicker, TimePicker } from "antd";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const { Option } = Select;

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [userVehicles, setUserVehicles] = useState([]);
  const { isLoggedIn } = useAuth();
  const [userData, setUserData] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchServices();
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/services/all"
      );
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      const response = await axios.get(
        `http://localhost:8080/api/owner/getbyemail/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data);
      fetchUserVehicles(response.data.userId);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const fetchUserVehicles = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/api/vehicle/owner/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserVehicles(response.data);
    } catch (error) {
      console.error("Error fetching user vehicles:", error);
    }
  };
  const showModal = (serviceId) => {
    setSelectedService(serviceId);
    fetchAvailableTimeSlots(serviceId);
    console.log( fetchAvailableTimeSlots(serviceId));
    if (isLoggedIn) {
      setIsModalOpen(true);
    } else {
      // Redirect to login page if not logged in
      message.error("Please Login First");
      navigate("/newlogin");
    }
  };
  const fetchAvailableTimeSlots = async (serviceId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/services/${serviceId}/availableTimeSlots`,
        
      );
      setAvailableTimeSlots(response.data);
    } catch (error) {
      console.error("Error fetching available time slots:", error);
    }
  };
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setIsModalOpen(false);
        makeAppointment(values);
      })
      
    //   if (userVehicles.length === 0) {
    //     // Redirect to My Vehicle page if user has no vehicles
    //     message.error("Please add a vehicle first");
    //     navigate("/my-vehicle"); // Adjust the route according to your setup
    //   } else {
    //     makeAppointment(values);
    //   }
    // })
    //
      .catch((errorInfo) => {
        console.error("Validation failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const makeAppointment = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const selectedVehicle = userVehicles.find(vehicle => vehicle.licensePlate === formData["vehicle Number"]);
      if (!selectedVehicle) {
        console.error("Selected vehicle not found in userVehicles");
        return;
      }
      const appointmentData = {
        ownerId: userData.userId,
        serviceId: selectedService,
        vehicleId: selectedVehicle.id,
        appointment: {
          appointment_date: formData.date.format("YYYY-MM-DD"),
          appointment_time: formData["time"],
          licensePlate: formData["vehicle Number"],
          status: "Scheduled",
          ...formData, // Other form data like name, vehicle number, etc.
        },
      };
      const response = await axios.post(
        "http://localhost:8080/api/appointments/add",
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Appointment made:", response.data);
      message.success("Booked Succesfully")
      fetchServices(); // Optionally, fetch services again to update the list
    } catch (error) {
      console.error("Error making appointment:", error);
    }
  };



  const renderVehicleSelect = () => {
    if (userVehicles.length === 0) {
      return (
        <div className="text-center p-4">
          <p>No vehicles added. Please add a vehicle first.</p>
          <Button className="bg-sky-900" type="primary" onClick={() => navigate("/vehicles")}>
            Add a Vehicle
          </Button>
        </div>
      );
    } else {
      return (
        <Form.Item
          label="Vehicle Number"
          name="vehicle Number"
          rules={[
            {
              required: true,
              message: "Please select a Vehicle Number!",
            },
          ]}
        >
          <Select placeholder="Select a Vehicle Number">
            {userVehicles.map((vehicle) => (
              <Option key={vehicle.id} value={vehicle.licensePlate}>
                {vehicle.licensePlate}
              </Option>
            ))}
          </Select>
        </Form.Item>
      );
    }
  };



  return (
    <>
      <NavBar />
      <Footer />

      <div className="flex flex-col md:flex-row justify-center  ">
        <div className="flex flex-col gap-8 mt-16  md:grid grid-cols-4   mb-40">
          {services.map((service) => (
            <div key={service.service_id} className="ml-20 mt-10 mr-20">
              <div className=" ">
                <Card
                  style={{
                    width: 300,
                  }}
                  cover={<img alt="example" src=" ./images/services.jpg" />}
                  actions={[
                    <Button
                      className="bg-sky-900"
                      type="primary"
                      shape="round"
                      onClick={() => showModal(service.service_id)}
                    >
                      Make Appointment
                    </Button>,
                  ]}
                >
                  <Meta
                    className="text-center font-bold"
                    title={service.service_name}
                    description={service.description}
                  />
                  <div className="text-center relative mt-3 font-bold">
                    <div>Avg Charge- {service.service_cost}$</div>
                    <div>Avg Time Dur:{service.duration} min</div>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
        <div>
          {/* Add Appointment Modal */}
          <Modal
            title="Make Appointment"
            visible={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <Form
              form={form}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ size: "default" }}
            >
               {renderVehicleSelect()}
              {/* <Form.Item
                label="Vehicle Number"
                name="vehicle Number"
                rules={[
                  {
                    required: true,
                    message: "Please select a Vehicle Number!",
                  },
                ]}
              >
                <Select placeholder="Select a Vehicle Number">
                  {userVehicles.map((vehicle) => (
                    <Option key={vehicle.id} value={vehicle.licensePlate}>
                      {vehicle.licensePlate}
                    </Option>
                  ))}
                </Select>
              </Form.Item> */}
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Please select a date!" }]}
              >
               <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
              <Form.Item
                label="Time"
                name="time"
                rules={[{ required: true, message: "Please select a time!" }]}
              >
               <Select placeholder="Select a Time">
                  {availableTimeSlots.map((timeSlot) => (
                 <Option
                 key={timeSlot.id}
                 value={timeSlot.startTime + '-' + timeSlot.endTime}
               >
                 {`${timeSlot.startTime} - ${timeSlot.endTime}`}
               </Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
            <div style={{ textAlign: "right" }}>
    <Button
    
      style={{ marginRight: 8 }}
      onClick={() => {
        form.resetFields();
      }}
    >
      Reset
    </Button>
    <Button
      type="primary"
      onClick={handleOk}
      className="bg-sky-900"
    >
      Submit
    </Button>
  </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Services;
