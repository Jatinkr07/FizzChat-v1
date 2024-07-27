import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import { BASE_URL } from "../index.js";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      navigate("/");
      console.log(res);
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      username: "",
      password: "",
    });
  };
  return (
    <div className="mx-auto min-w-96">
      <div className="w-full p-6 bg-white border border-gray-100 rounded-lg shadow-md bg-opacity-60 bg-clip-padding backdrop-filter backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-center text-black">Login</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className="p-2 label">
              <span className="text-base font-bold text-black label-text">
                Username
              </span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full h-10 text-black bg-slate-100 input input-bordered"
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
              className="w-full h-10 text-black bg-slate-100 input input-bordered"
              type="password"
              placeholder="Enter Your Password"
            />
          </div>
          <p className="my-3 text-center text-black">
            Don't have an account?{" "}
            <Link
              className="font-bold text-blue-500 hover:text-blue-600 text-normal"
              to="/signup"
            >
              {" "}
              signup{" "}
            </Link>
          </p>
          <div>
            <button
              type="submit"
              className="mt-2 font-bold text-white border border-slate-700 btn btn-block btn-sm "
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
