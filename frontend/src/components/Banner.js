import React from 'react';
import { Link } from 'react-router-dom';
import admin from '../assets/admin.png';
import user from '../assets/user.png';

const Banner = () => {
  return (
    <div className="h-screen flex justify-center items-center flex-col gap-16 bg-[#fafafa]">
      <div className="flex  md:justify-between items-center mx-10">
        <div className="w-full">
          <h1 className="text-3xl lg:text-5xl xl:text-9xl text-blue-500 text-center font-semibold">Employee</h1>
          <h2 className="text-2xl lg:text-5xl xl:text-8xl mt-6 text-center">Attendance Tracker</h2>
        </div>
        <div className="hidden md:flex w-[50%]">
          <img src="https://www.softworks.com/wp-content/uploads/2023/11/Strategies-for-Improving-Employee-Attendance-Blog-Image.png" alt="" className="rounded-md" />
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <div className="flex flex-wrap justify-center gap-8 mx-10">
          <Link to="/login">
            <div className="border-2 rounded-md p-5 flex flex-col justify-center items-center gap-8 w-48 shadow-xl hover:shadow-inner">
              <img src={admin} alt="admin" className="w-14" />
              <button className="px-3 rounded-md py-2 w-full bg-blue-400 border-none hover:bg-blue-500 text-lg">Admin Login</button>
            </div>
          </Link>
          <Link to="/employee/login">
            <div className="border-2 p-5 flex flex-col justify-center items-center gap-8 w-48 shadow-xl hover:shadow-inner">
              <img src={user} alt="user" className="w-14" />
              <button className="px-3 rounded-md py-2 bg-pink-100 border-none hover:bg-pink-200 text-lg">User Login</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
