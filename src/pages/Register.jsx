import React, { useState } from 'react';
import { SiWebmoney } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { registerUser } from '../service/authService';

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    dob: '',
    tel: '',
    password: '',
    gender: ''
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.firstname || formData.firstname.length < 2) {
      setMessage("Please enter a valid firstname (at least 2 characters)");
      setMessageType("error");
      return false;
    }

    if (!formData.lastname || formData.lastname.length < 2) {
      setMessage("Please enter a valid lastname (at least 2 characters)");
      setMessageType("error");
      return false;
    }

    if (!formData.username || formData.username.length < 3) {
      setMessage("Username must be at least 3 characters long");
      setMessageType("error");
      return false;
    }

    if (!formData.dob) {
      setMessage("Please enter your date of birth");
      setMessageType("error");
      return false;
    }

    if (!formData.tel || !/^\d{10,15}$/.test(formData.tel)) {
      setMessage("Please enter a valid phone number (10-15 digits)");
      setMessageType("error");
      return false;
    }

    if (!formData.password || formData.password.length < 6) {
      setMessage("Password must be at least 6 characters long");
      setMessageType("error");
      return false;
    }

    if (!formData.gender || !["male", "female"].includes(formData.gender.toLowerCase())) {
      setMessage("Please enter a valid gender (male or female)");
      setMessageType("error");
      return false;
    }

    setMessage("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await registerUser(formData);
      console.log("Register response:", response);

      if (response?.message === "User registered successfully" || response?.statusCode === "200") {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        alert("Registration may not have completed successfully.");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed. Please try again.";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4 sm:px-6 lg:px-8">
      <section className="bg-white w-full max-w-md sm:max-w-lg p-6 sm:p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
            <SiWebmoney className="text-blue-600 text-5xl" />
            <span className="text-blue-600">FLEXPAY</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="text-lg font-semibold text-center">Create Your Account</h2>

          {message && (
            <p className={`text-sm text-center ${messageType === "error" ? "text-red-600" : "text-green-600"}`}>
              {message}
            </p>
          )}

          <div>
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">Firstname</label>
            <input
              id="firstname"
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              required
              className="mt-1 w-full p-3 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your firstname"
            />
          </div>

          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Lastname</label>
            <input
              id="lastname"
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              required
              className="mt-1 w-full p-3 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your lastname"
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="mt-1 w-full p-3 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              id="dob"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              required
              className="mt-1 w-full p-3 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="mt-1 w-full p-3 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your password"
            />
          </div>

          {/* Responsive Phone & Gender in grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="tel" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                id="tel"
                type="text"
                name="tel"
                value={formData.tel}
                onChange={handleInputChange}
                required
                className="mt-1 w-full p-3 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="mt-1 w-full p-3 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-md transition"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Register;
