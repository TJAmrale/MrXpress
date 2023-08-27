import axios from "axios"; // Importing axios library

// Creating a new instance of axios with a custom configuration, using a base URL derived from environment variables.
const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api` // Setting baseURL using environment variable
});

// Intercepting every request to add potential authentication headers.
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("ACCESS_TOKEN"); // Get token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set token as Authorization header if it exists
    }
    return config; // Return the modified or unmodified config
  },
  (error) => {
    return Promise.reject(error); // Handle and propagate request setup error
  }
);

// Intercepting every response to handle potential errors and specific scenarios.
axiosClient.interceptors.response.use(
  (response) => {
    return response; // Directly return any successful response
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) { // Check for 401 Unauthorized error
        localStorage.removeItem("ACCESS_TOKEN"); // Remove invalid token from local storage
        console.error("Unauthorized request:", error.response); // Log the unauthorized error
      }
    } else if (error.request) {
      console.error("No response received:", error.request); // Log when request was made but no response was received
    }
    return Promise.reject(error); // Propagate the error for further handling
  }
);


export default axiosClient;