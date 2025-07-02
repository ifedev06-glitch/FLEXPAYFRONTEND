import axios from "axios";

const BASE_URL = "http://localhost:8085/api/v1"; 

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth`, credentials);
    console.log("Backend response:", response.data); // ✅ See this in browser console
    return response.data;
  } catch (error) {
    console.error("Error connecting to backend:", error.response?.data || error.message);
    throw error;
  }
};
