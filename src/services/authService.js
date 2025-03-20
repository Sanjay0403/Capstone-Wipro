
import axios from "axios";

const API_URL = "https://localhost:7144/api/auth";

// Register function
export const register = async (firstName, lastName, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            firstName,
            lastName,
            email,
            password
        });

        return response.data; // Return response message
    } catch (error) {
        console.error("Registration failed:", error.response?.data || error.message);
        throw error.response?.data || "Registration failed. Please try again.";
    }
};

// Login function
export const login = async (email, password) => {
    console.log(" Calling API with:", email, password); // Debugging
    try {
    const response = await axios.post("/api/auth/login", { email, password });
      console.log(" API Response:", response.data); // Debugging
    return response.data;
    } catch (error) {
    console.error(" API Error:", error.response?.data || error.message);
    throw error;
    }
};



// Logout function
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Remove stored user data
    window.location.href = "/login"; // Force redirect to login
};

// Get Auth Token (for protected API calls)
export const getAuthToken = () => {
    return localStorage.getItem("token");
};

// Get Logged-in User (for persisting session)
export const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};
