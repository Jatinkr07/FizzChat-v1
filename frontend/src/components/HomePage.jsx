/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { authUser } = useSelector((store) => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="flex sm:h-[460px] md:h-[550px] rounded-lg overflow-hidden bg-white bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default HomePage;
