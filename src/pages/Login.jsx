"use client"

import { useState } from "react";
import { SiWebmoney } from "react-icons/si";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../service/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await loginUser(user);
    console.log("Login response:", response);

    const token = response?.data?.token; 

    if (token) {
      localStorage.setItem("authToken", token);
      alert("Login successful!");
      navigate("/profile");
    } else {
      alert("Login failed: Token not found.");
    }
  } catch (error) {
    const message =
      error.response?.data?.message || "Login failed. Please check your credentials.";
    alert(message);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 p-4">
      <section className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold flex items-center justify-center gap-2 mb-6">
          <SiWebmoney className="text-blue-600 text-5xl" />
          <span className="text-blue-600">FLEXPAY</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="text-lg font-semibold text-center">Login to your account</h2>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={user.username}
              onChange={handleInputChange}
              required
              className="mt-1 w-full p-3 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={user.password}
                onChange={handleInputChange}
                required
                placeholder="Enter your password"
                className="mt-1 w-full p-3 pr-10 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              Remember me
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-md transition"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline font-medium">
              Sign up here
            </a>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Login;
