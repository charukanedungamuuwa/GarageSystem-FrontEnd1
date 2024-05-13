const BASE_URL = "http://localhost:8080/api/owner"; // Update with your Spring Boot backend URL

const addVehicleOwner = async (vehicleOwnerData) => {
  const response = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vehicleOwnerData),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error.message || "Failed to add vehicle owner");
  }

  return await response.text();
};

export default {
  addVehicleOwner,
};