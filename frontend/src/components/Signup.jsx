import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BaseUrl } from "..";
import { IoMdMale, IoMdFemale } from "react-icons/io";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post(`${BaseUrl}/api/v1/user/register`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        const token = res.data.token;
        localStorage.setItem("token", token);
        navigate("/login");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errorMsg);
      console.log(error);
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };
  return (
    <div className="mx-auto min-w-96">
      <div className="w-full p-6 bg-white border border-gray-100 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60">
        <h1 className="text-3xl font-bold text-center text-black">Signup</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className="p-2 label">
              <span className="text-base font-bold text-black label-text">
                Full Name
              </span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="w-full h-10 text-black input input-bordered bg-slate-100"
              type="text"
              placeholder="Enter Your Fullname"
            />
          </div>
          <div>
            <label className="p-2 label">
              <span className="text-base font-bold text-black label-text">
                Username
              </span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full h-10 text-black input input-bordered bg-slate-100"
              type="text"
              placeholder="Enter Your Username"
            />
          </div>
          <div>
            <label className="p-2 label">
              <span className="text-base font-bold text-black label-text">
                Password
              </span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full h-10 text-black input input-bordered bg-slate-100"
              type="password"
              placeholder="Enter Your Password"
            />
          </div>
          <div>
            <label className="p-2 label">
              <span className="text-base font-bold text-black label-text">
                Confirm Your Password
              </span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              className="w-full h-10 text-black bg-slate-100 input input-bordered"
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <div className="flex items-center my-4">
            <div className="flex items-center gap-2">
              <IoMdMale className="text-lg text-blue-400" />
              <p className="font-bold text-black">Male</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                defaultChecked
                className="mx-2 bg-white checkbox"
              />
            </div>
            <div className="flex items-center gap-2">
              <IoMdFemale className="text-lg text-pink-400" />
              <p className="font-bold text-black">Female</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                defaultChecked
                className="mx-2 bg-white checkbox"
              />
            </div>
          </div>
          <p className="my-2 text-center text-black">
            Already have an account?{" "}
            <Link
              className="font-bold text-blue-500 hover:text-blue-600 text-bold"
              to="/login"
            >
              {" "}
              login{" "}
            </Link>
          </p>
          <div>
            <button
              type="submit"
              className="mt-2 font-bold text-white border btn btn-block btn-sm border-slate-700"
            >
              Singup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
