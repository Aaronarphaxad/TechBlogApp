import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/AuthContext";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
  const { setToken } = useAuth();
  const navigate = useNavigate();

  // Function to update formdata
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to submit form
  async function handleSignIn(e) {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Enter email and password to log in");
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/login",
        formData
      );
      // console.log("User Logged in:", response.data);
      const data = await response.data;
      const { token } = data;
      // Store the token in local storage
      setToken(token);
      // alert("Login successful");
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.error("Error creating user:", error.response.data.error);
        alert(error.response.data.error); // Display the specific error message to the user
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server");
        alert("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request", error.message);
        alert("Error setting up the request");
      }
    }
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to access full features
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSignIn}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="/"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  id="password"
                  name="password"
                  type={visible ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="block w-full pl-2 mb-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {visible ? (
                  <AiOutlineEyeInvisible
                    size={20}
                    onClick={() => setVisible((prev) => (prev = !prev))}
                  />
                ) : (
                  <AiOutlineEye
                    size={20}
                    onClick={() => setVisible((prev) => (prev = !prev))}
                  />
                )}
              </div>
            </div>

            <div>
              <button
                onClick={handleSignIn}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <span className="underline hover:text-blue-700 font-bold">
              <Link to="/sign-up">Sign Up</Link>
            </span>
          </p>
          <p className="mt-10 text-center text-sm font-bold text-gray-800">
            <span className="underline hover:text-blue-700">
              <Link to="/">Go Back Home</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
