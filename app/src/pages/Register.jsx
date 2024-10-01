import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userType: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [isExist, setIsExist] = useState(false);
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      setIsConfirm(false);
      const dataBody = { ...userData, password };
      console.log(dataBody);

      try {
        const response = await axios.post(
          `http://localhost:3000/${userData.userType}/signup`,
          dataBody
        );
        console.log(response.data);
        navigate("/login");
      } catch (error) {
        console.log("User Already Exist");
      }
    } else {
      setIsConfirm(true);
      console.log("incorrect password");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container w-[90vw] h-auto bg-white my-10 flex flex-col items-center justify-center p-6 rounded-md shadow-xl sm:w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw]">
      <div className="flex flex-col justify-center items-center w-full mb-6">
        <h1 className="text-3xl font-bold text-black">Register</h1>
        <p className="p-1 text-gray-500">Create a new account</p>
      </div>
      <div className="w-full">
        <form onSubmit={handleOnSubmit} className="w-full space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="font-medium">
                First Name
              </label>
              <input
                value={userData.firstName}
                onChange={handleChange}
                name="firstName"
                required
                type="text"
                placeholder="First Name"
                className="h-10 px-3 outline-none bg-gray-100 rounded-md focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="font-medium">
                Last Name
              </label>
              <input
                value={userData.lastName}
                onChange={handleChange}
                name="lastName"
                required
                type="text"
                placeholder="Last Name"
                className="h-10 px-3 outline-none bg-gray-100 rounded-md focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              value={userData.email}
              onChange={handleChange}
              name="email"
              required
              type="email"
              placeholder="Email"
              className="h-10 px-3 outline-none bg-gray-100 rounded-md focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              required
              type="password"
              placeholder="Password"
              className="h-10 px-3 outline-none bg-gray-100 rounded-md focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="confirmPassword" className="font-medium">
              Confirm Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmPassword"
              required
              type="password"
              placeholder="Confirm Password"
              className={`h-10 px-3 outline-none bg-gray-100 rounded-md focus:ring-2 focus:ring-black ${
                isConfirm && "outline outline-red-600"
              }`}
            />
            {isConfirm && (
              <span className="text-red-600 text-sm">
                Passwords do not match.
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="userType" className="font-medium">
              User Type
            </label>
            <select
              value={userData.userType}
              onChange={handleChange}
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

          <div className="flex items-center justify-center">
            <button className="w-full h-10 bg-black text-white font-semibold rounded-md ">
              Register
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500">
            Already have an account?{" "}
            <NavLink to="/login">
              <span className="text-blue-500 hover:underline">SignIn</span>
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
