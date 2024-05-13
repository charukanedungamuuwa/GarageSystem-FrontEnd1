        import React, { useState, useEffect } from 'react';
        import axios from 'axios';
        import NavBar from '../Components/NavBar';
        import Footer from '../Components/Footer';
        import { useAuth } from '../Pages/AuthContext';
        import { Modal, Input, Button,Select,DatePicker,message } from 'antd';
        import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
        import moment from 'moment';
        const { Option } = Select;
        const Appointments = () => {
          const [appointments, setAppointments] = useState([]);
          const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
          const [loading, setLoading] = useState(true);
          const [userProfile, setUserProfile] = useState(null);
          const { isLoggedIn } = useAuth();
          const [editModalVisible, setEditModalVisible] = useState(false);
          const [editForm, setEditForm] = useState({
            appointment_date: '',
            appointment_time: '',
            status: '',
          });
          const [editedAppointment, setEditedAppointment] = useState(null);
          const fetchUserProfile = async () => {
            try {
              const token = localStorage.getItem('token');
              const email = localStorage.getItem('email');
              const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };
              const response = await axios.get(`http://localhost:8080/api/owner/getbyemail/${email}`, config);
              setUserProfile(response.data);
            } catch (error) {
              console.error('Error fetching user profile:', error);
            }
          };

          useEffect(() => {
            if (isLoggedIn) {
              fetchUserProfile();
            }
          }, [isLoggedIn]);

          useEffect(() => {
            if (userProfile) {
              const fetchAppointments = async () => {
                try {
                  const token = localStorage.getItem('token');
                  const config = {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  };
                  const appointmentResponse = await axios.get(`http://localhost:8080/api/appointments/get/${userProfile.userId}`, config);
                  const fetchedAppointments = appointmentResponse.data;

                  const appointmentsWithService = await Promise.all(
                    fetchedAppointments.map(async (appointment) => {
                      const serviceResponse = await axios.get(`http://localhost:8080/api/services/getbyid/${appointment.serviceId}`, config);
                      const serviceData = serviceResponse.data;
                      return { ...appointment, service: serviceData };
                    })
                  );


                  setAppointments(appointmentsWithService);
                  setLoading(false);

                
                } catch (error) {
                  console.error('Error fetching appointments:', error);
                  setLoading(false); // Make sure to set loading to false even if there's an error
                }
              };

              fetchAppointments();
            }
          }, [userProfile]);

          if (loading) {
            return <div>Loading...</div>;
          }
          // const handleDelete = async (id) => {
          //   try {
          //     const token = localStorage.getItem('token');
          //     const config = {
          //       headers: {
          //         Authorization: `Bearer ${token}`,
          //       },
          //     };
          //     await axios.delete(`http://localhost:8080/api/appointments/delete/${id}`, config);
          //     setAppointments((prevAppointments) => prevAppointments.filter((appointment) => appointment.appointment_id !== id));
          //   } catch (error) {
          //     console.error('Error deleting appointment:', error);
          //     message.error('Error deleting appointment');
          //   }
          // };

          const handleDelete = async (id) => {
            try {
              const token = localStorage.getItem('token');
              const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };
              
              // Fetch appointment details to check if more than 1 day remaining
              const appointmentResponse = await axios.get(`http://localhost:8080/api/appointments/getById/${id}`, config);
              const appointmentDetails = appointmentResponse.data;
              
              // Calculate remaining days
              const appointmentDate = moment(appointmentDetails.appointment_date, 'YYYY-MM-DD');
              const today = moment();
              const remainingDays = appointmentDate.diff(today, 'days');
              
              // Check if more than 1 day remaining, then proceed with deletion
              if (remainingDays > 1) {
                await axios.delete(`http://localhost:8080/api/appointments/delete/${id}`, config);
                setAppointments((prevAppointments) => prevAppointments.filter((appointment) => appointment.appointment_id !== id));
                message.success('Appointment deleted successfully');
              } else {
                message.error('Cannot delete appointment. Less than 1 day remaining.');
              }
            } catch (error) {
              console.error('Error deleting appointment:', error);
              message.error('Error deleting appointment');
            }
          };

        //
        //

        //
        // const handleEdit = async (appointment) => {
        //   try{
        //   setEditedAppointment(appointment);
        //   setEditForm({
        //     appointment_date: appointment.appointment_date,
        //     appointment_time: appointment.appointment_time,
        //     status: appointment.status,
        //   });
        //   const response = await axios.get(`http://localhost:8080/api/services/${appointment.serviceId}/availableTimeSlots`);
        //   setAvailableTimeSlots(response.data);
        //   setEditModalVisible(true);

        // } catch (error) {
        //   console.error('Error fetching available time slots:', error);
        //   message.error('Error fetching available time slots');
        // }
          
        // };
//


const handleEdit = async (appointment) => {
  try {
    const appointmentDate = moment(appointment.appointment_date, 'YYYY-MM-DD');
    const today = moment();
    const daysRemaining = appointmentDate.diff(today, 'days');

    if (daysRemaining < 1) {
      message.error('You cannot edit appointments with less than 1 day remaining.');
      return;
    }

    setEditedAppointment(appointment);
    setEditForm({
      appointment_date: moment(appointment.appointment_date, 'YYYY-MM-DD'),
      appointment_time: appointment.appointment_time,
      status: appointment.status,
    });

    // Fetch available time slots for the service
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(`http://localhost:8080/api/services/${appointment.serviceId}/availableTimeSlots`, config);
    setAvailableTimeSlots(response.data);

    setEditModalVisible(true);
  } catch (error) {
    console.error('Error handling edit:', error);
    message.error('Error handling edit');
  }
};




        //

        // const handleSaveEdit = async () => {
        //   try {
        //     const token = localStorage.getItem('token');
        //     const config = {
        //       headers: {
        //         Authorization: `Bearer ${token}`,
        //       },
        //     };
        //     const updatedAppointment = { ...editedAppointment, ...editForm };
        //     await axios.put(`http://localhost:8080/api/appointments/update/${editedAppointment.appointment_id}`, updatedAppointment, config);
        //     setEditModalVisible(false);
            
        //     const updatedAppointments = appointments.map((appointment) =>
        //       appointment.appointment_id === editedAppointment.appointment_id ? updatedAppointment : appointment
        //     );
        //     setAppointments(updatedAppointments);
        //   } catch (error) {
        //     console.error('Error updating appointment:', error);
        //   }
        // };
        const handleSaveEdit = async () => {
          try {
            const token = localStorage.getItem('token');
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
        
            // Convert moment object to string
            const formattedDate = moment(editForm.appointment_date).format('YYYY-MM-DD');
        
            // Create the updated appointment object
            const updatedAppointment = {
              ...editedAppointment,
              appointment_date: formattedDate,
              ...editForm,
            };
        
            await axios.put(`http://localhost:8080/api/appointments/update/${editedAppointment.appointment_id}`, updatedAppointment, config);
            setEditModalVisible(false);
            
            // Update the appointments list
            const updatedAppointments = appointments.map((appointment) =>
              appointment.appointment_id === editedAppointment.appointment_id ? updatedAppointment : appointment
            );
            setAppointments(updatedAppointments);
          } catch (error) {
            console.error('Error updating appointment:', error);
          }
        };
        
        
        
        
        const handleCancelEdit = () => {
          setEditModalVisible(false);
        };

        const handleInputChange = (e) => {
          const { name, value } = e.target;
          setEditForm((prevForm) => ({
            ...prevForm,
            [name]: value,
          }));
        };

        if (loading) {
          return <div>Loading...</div>;
        }
          //
          return (
            <>
              <NavBar />
              <div className="max-w-7xl mx-auto px-4 py-8">
                <h2 className="text-4xl font-bold mb-4 text-center mt-24">My Appointments</h2>
                <div className="overflow-hidden border border-gray-300 rounded-lg mt-16">
                  <table className="w-full ">
                    <thead className="bg-gray-200 ">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Service Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Vehicle</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3   text-left text-xs font-medium text-gray-600 uppercase tracking-wider ">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {appointments.map(appointment => (
                        <tr key={appointment.id} className="hover:bg-gray-100">
                          <td className="px-6 py-4 whitespace-nowrap">{appointment.service.service_name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{appointment.appointment_date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{appointment.appointment_time}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{appointment.licensePlate}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-block rounded-full text-xs font-semibold ${
                                appointment.status === 'Pending'
                                  ? 'bg-yellow-200 text-yellow-800'
                                  : appointment.status === 'Confirmed'
                                  ? 'bg-green-200 text-green-800'
                                  : 'bg-red-200 text-red-800'
                              }`}
                            >
                              {appointment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => handleEdit(appointment)}
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                            >
                              <EditOutlined/>
                            </button>
                            <button
                              onClick={() => handleDelete(appointment.appointment_id)}
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2  rounded focus:outline-none focus:shadow-outline ml-2"
                            >
                              <DeleteOutlined/>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <Modal
                title="Edit Appointment"
                visible={editModalVisible}
                onOk={handleSaveEdit}
                onCancel={handleCancelEdit}
              >
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Date:</label>
                    {/* <Input
                      type="text"
                      
                      name="appointment_date"
                      value={editForm.appointment_date}
                      onChange={handleInputChange}
                      placeholder="Appointment Date"
                      
                    /> */}
          <DatePicker
          value={editForm.appointment_date ? moment(editForm.appointment_date, 'YYYY-MM-DD') : null}
          onChange={(date, dateString) => setEditForm((prevForm) => ({ ...prevForm, appointment_date: dateString }))}
          format="YYYY-MM-DD"
          placeholder="Appointment Date"
          disabledDate={(current) => current && current < moment().startOf('day')}
        />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Time:</label>
                    {/* <Input
                      type="text"
                      name="appointment_time"
                      value={editForm.appointment_time}
                      onChange={handleInputChange}
                      placeholder="Appointment Time"
                    /> */}
                    <Select
                name="appointment_time"
                value={editForm.appointment_time}
                onChange={(value) => setEditForm((prevForm) => ({ ...prevForm, appointment_time: value }))}
                placeholder="Select a Time"
              >
                {availableTimeSlots.map((timeSlot) => (
                  <Option key={timeSlot.id} value={timeSlot.startTime + '-' + timeSlot.endTime}>
                    {`${timeSlot.startTime} - ${timeSlot.endTime}`}
                  </Option>
                ))}
              </Select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Status:</label>
                    <Input
                      type="text"
                      name="status"
                      value={editForm.status}
                      onChange={handleInputChange}
                      placeholder="Status"
                    />
                  </div>
                </form>
              </Modal>
              <Footer />
            </>
          );
        };

        export default Appointments;
