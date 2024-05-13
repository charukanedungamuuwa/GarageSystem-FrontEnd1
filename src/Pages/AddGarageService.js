import React, { useState } from 'react';

function AddGarageService() {
    const [category, setCategory] = useState('Car Repair');
    const [serviceName, setServiceName] = useState('');
    const [serviceCost, setServiceCost] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [timeSlots, setTimeSlots] = useState([{ startTime: '', endTime: '' }]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedTimeSlots = [...timeSlots];
        updatedTimeSlots[index][name] = value;
        setTimeSlots(updatedTimeSlots);
    };

    const handleAddTimeSlot = () => {
        const newTimeSlot = { startTime: '', endTime: '' };
        setTimeSlots([...timeSlots, newTimeSlot]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Disable submit button to prevent multiple submissions
        setIsSubmitting(true);

        // You can modify the fetch request to send the entire garage service object
        fetch('http://localhost:8080/api/services/api/add-garage-service', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                category,
                service_name: serviceName,
                service_cost: parseFloat(serviceCost),
                description,
                duration: parseInt(duration),
                timeSlots
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add Garage Service');
            }
            alert('Garage Service added successfully!');
            // Optionally, you can reset the form fields after successful submission
            setCategory('Car Repair');
            setServiceName('');
            setServiceCost('');
            setDescription('');
            setDuration('');
            setTimeSlots([{ startTime: '', endTime: '' }]);
            setIsSubmitting(false); // Re-enable the submit button
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to add Garage Service');
            setIsSubmitting(false); // Re-enable the submit button in case of error
        });
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">Add Garage Service</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Category:</label>
                    <input
                        className="w-full px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="text"
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Service Name:</label>
                    <input
                        className="w-full px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="text"
                        name="serviceName"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Service Cost:</label>
                    <input
                        className="w-full px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="number"
                        name="serviceCost"
                        value={serviceCost}
                        onChange={(e) => setServiceCost(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Description:</label>
                    <input
                        className="w-full px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Duration:</label>
                    <input
                        className="w-full px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="number"
                        name="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Time Slots:</label>
                    {timeSlots.map((slot, index) => (
                        <div key={index} className="flex mb-2">
                            <input
                                className="w-1/2 px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:border-indigo-500 mr-2"
                                type="text"
                                placeholder="Start Time"
                                name="startTime"
                                value={slot.startTime}
                                onChange={(e) => handleChange(e, index)}
                            />
                            <input
                                className="w-1/2 px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:border-indigo-500"
                                type="text"
                                placeholder="End Time"
                                name="endTime"
                                value={slot.endTime}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddTimeSlot}
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Add Time Slot
                    </button>
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting} // Disable the button if submitting
                    className={`bg-green-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                >
                    {isSubmitting ? 'Adding...' : 'Add Garage Service'}
                </button>
            </form>
        </div>
    );
}

export default AddGarageService;
