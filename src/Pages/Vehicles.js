import React, { useState, useEffect } from "react";
import { Card, Modal, Form, Input, Select, Button ,message} from "antd";
import { PlusOutlined,DeleteOutlined,EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { useAuth } from '../Pages/AuthContext';
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";

const { Meta } = Card;
const { Option } = Select;

const Vehicles = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [userProfile, setUserProfile] = useState(null);
  const [userVehicles, setUserVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  
  const [selectedVehicleType, setSelectedVehicleType] = useState("car"); // Default to "car"
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserProfile();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    form.setFieldsValue({ type: selectedVehicleType });
  }, [selectedVehicleType, form]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `http://localhost:8080/api/owner/getbyemail/${email}`,
        config
      );
      setUserProfile(response.data);
      fetchUserVehicles(response.data.userId);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchUserVehicles = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `http://localhost:8080/api/vehicle/owner/${userId}`,
        config
      );
      setUserVehicles(response.data);
    } catch (error) {
      console.error("Error fetching user vehicles:", error);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
    setSelectedVehicle(null);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setIsModalOpen(false);
        // saveVehicle(values);
        if (selectedVehicle) {
          // If selected vehicle exists, it's an edit
          editVehicle(values);
        } else {
          // Otherwise, it's an add
          addVehicle(values);
        }
      })
      .catch((errorInfo) => {
        console.error("Validation failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    setSelectedVehicle(null);
  };

  // const saveVehicle = async (values) => {
    const addVehicle = async (values) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        "http://localhost:8080/api/vehicle/add",
        {
          ownerId: userProfile.userId,
          vehicle: values,
        },
        config
      );
      console.log("Vehicle added:", response.data);
      // Refresh the list of vehicles after adding
      fetchUserVehicles(userProfile.userId);
    } 
    catch (error) {
      if (error.response && error.response.data) {
        message.error("Vehicle Is Allready Registered."); // Display error message from server
      } else {
        message.error("An error occurred while adding the vehicle.");
      }
    }
  };
  //   catch (error) {
  //     console.error("Error adding vehicle:", error);
  //   }
  // };

  const editVehicle = async (values) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `http://localhost:8080/api/vehicle/edit/${selectedVehicle.id}`,
        values,
        config
      );
      console.log("Vehicle edited:", response.data);
      message.success("Vehicle edited successfully");
      fetchUserVehicles(userProfile.userId);
    } catch (error) {
      
      message.error("Can't Edit the vehicle.There is An Appoinment for the vehicle");
    }
  };



  const handleVehicleTypeChange = (value) => {
    setSelectedVehicleType(value);
  };

  const getVehicleImage = (vehicleType) => {
    switch (vehicleType) {
      case "car":
        return "./images/car.jpg";
      case "bike":
        return "./images/bike.jpg";
      case "3wheel":
        return "./images/3wheel.jpg";
      case "bus":
        return "./images/bus.jpg";
      default:
        return "./images/car.jpg"; // Default image
    }
  };



  const handleEdit = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
    form.setFieldsValue({
      licensePlate: vehicle.licensePlate,
      type: vehicle.type,
      model: vehicle.model,
      year: vehicle.year,
    });
  };

  
  const handleDelete = async (vehicleId) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `http://localhost:8080/api/vehicle/delete/${vehicleId}`,
        config
      );
      console.log("Vehicle deleted:", response.data);
      message.success("Vehicle Deleted Succesfully");
      // Refresh the list of vehicles after deletion
      fetchUserVehicles(userProfile.userId);
    } catch (error) {
      
      message.error("Can't delete the vehicle.There is An Appoinment for the vehicle");
    }
  };

  return (
    <>
      <NavBar />
      <Footer />

      <div className="flex flex-col md:flex-row justify-center ">
        <div className="flex flex-col gap-24 mt-48 md:grid grid-cols-4 mb-40">
          {userVehicles.map((vehicle) => (
            <div key={vehicle.id}>
              <Card
                hoverable
                className="rounded-lg overflow-hidden shadow-lg "
                cover={
                  <img
                    className="h-60 w-48 object-cover"
                    alt="Vehicle"
                    src={getVehicleImage(vehicle.type)} // Pass the vehicle type to getVehicleImage
                  />
                }
              >
                <Meta
                  className="text-center text-[22px]  font-bold  "
                  title={vehicle.name}
                  description={vehicle.licensePlate}
                />
                <hr className="border-sky-600	" />
               
                <div className=" mt-4 text-[16px]  flex justify-center gap-x-8">
                  <div className=" font-serif">
                    <div>Type</div>
                    <div>Model</div>
                    <div>NumberPlate</div>
                    <div>Year </div>
                  </div>
                  <div className=" font-serif ">
                    <div>: {vehicle.type}</div>
                    <div>: {vehicle.model}</div>
                    <div>: {vehicle.licensePlate}</div>
                    <div>: {vehicle.year}</div>
                  </div>
                </div>
               
               
                <div className="flex justify-center"> 
                <Button
                    className="mt-4 bg-sky-900 text-white "
                    type="danger"
                    onClick={() => handleEdit(vehicle)}
                    icon={<EditOutlined />}
                  >
                    Edit
                  </Button>
                <Button
                  className="mt-4  bg-sky-900 text-white ml-4 "
                  type="danger"
                  onClick={() => handleDelete(vehicle.id)}
                  icon={<DeleteOutlined />}
                >
                  Delete
                </Button></div>
                
              </Card>
              
            </div>
          ))}
          <div className="md:mt-32 ">
           
              <Card
                hoverable
                className="rounded-lg overflow-hidden shadow-lg flex-col  "
                style={{ width: 240, height: 200 }}
                cover={<PlusOutlined className="text-7xl text-black-500  " />}
              >
                 <Button
              className="bg-sky-900 mt-8 ml-2"
              type="primary"
              shape="round"
              
              onClick={showModal}
            >ADD A NEW VEHICLE</Button>
               
              </Card>
           
          </div>
        </div>
        <div>
          {/* Add Vehicle Modal */}
          <Modal
            title={selectedVehicle ? "Edit Vehicle" : "Add Vehicle"}
            visible={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            
          >
            <Form
              form={form}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ type: "car" }}
            >
              <Form.Item
                label="Vehicle Number"  name="licensePlate"
                initialValue={selectedVehicle ? selectedVehicle.licensePlate : ""}
                rules={[{ required: true, message: "Please enter the number!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Vehicle Type"
                name="type"
                initialValue={selectedVehicle ? selectedVehicle.type : "car"}
                rules={[{ required: true, message: "Please select the type!" }]}
              >
                <Select onChange={handleVehicleTypeChange}>
                  <Option value="car">Car</Option>
                  <Option value="bike">Bike</Option>
                  <Option value="3wheel">3Wheel</Option>
                  <Option value="bus">Bus</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Vehicle Model"
                name="model"
                initialValue={selectedVehicle ? selectedVehicle.model : ""}
                rules={[{ required: true, message: "Please enter the model!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Manufactured Year"
                name="year"
                initialValue={selectedVehicle ? selectedVehicle.year : ""}
                rules={[{ required: true, message: "Please enter the year!" }]}
              >
                <Input />
              </Form.Item>
            </Form>
            <div style={{ textAlign: "right" }}>
            <Button
                style={{ marginRight: 8 }}
                onClick={() => {
                  form.resetFields();
                  setIsModalOpen(false);
                  setSelectedVehicle(null);
                }}
              >
                Cancel
              </Button>
    <Button
                type="primary"
                onClick={handleOk}
                className="bg-sky-900"
              >
                {selectedVehicle ? "Save Changes" : "Add Vehicle"}
              </Button>
  </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Vehicles;