import React, { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [userType, setUserType] = useState("");
  const [userExist, setUserExist] = useState(true);
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(loginData);
    try {
      const response = await axios.post(
        `http://localhost:3000/${userType}/login`,
        loginData
      );
      if (response.status === 200) {
        if (userType === "user") {
          console.log(response.data.token);
          localStorage.setItem("User Token ", response.data.token);
        } else {
          console.log(response.data.token);
          localStorage.setItem("Admin Token ", response.data.token);
        }

        navigate("/");
      } else {
      }
      console.log(response.data);
    } catch (error) {
      console.log("something went wrong ", error);
      setUserExist(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value.toString(),
    }));
  };
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center bg-gray-50">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Welcome back
          </h1>
          <p className="text-sm text-gray-500">
            Enter your email to sign in to your account
          </p>
        </div>
        <div className="grid gap-6">
          <form onSubmit={handleOnSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-1">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  value={loginData.email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                />
              </div>
              <div className="grid gap-1">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  value={loginData.password}
                  onChange={handleChange}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className="h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="userType"
                  className="text-sm font-medium text-gray-700"
                >
                  User Type
                </label>
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  name="userType"
                  required
                  className="h-10 px-2 outline-none bg-gray-100 rounded-md focus:ring-2 focus:ring-black"
                >
                  <option value="" disabled>
                    Select User Type
                  </option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button
                type="submit"
                className="mt-4 h-10 w-full bg-black text-white font-semibold rounded-md focus:outline-none focus:ring-2  focus:ring-opacity-50"
              >
                Sign In
              </button>
            </div>
          </form>
          {!userExist && (
            <div>
              <p className=" text-center text-lg text-gray-500">
                User Not Found!
              </p>
            </div>
          )}
        </div>
        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <NavLink to="/register" className="text-blue-600 hover:underline">
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
