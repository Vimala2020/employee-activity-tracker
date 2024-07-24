import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { auth } from './Firebase';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
      toast.success('Successfully Logged Out');
    } catch (error) {
      alert(error);
      toast.error(error.message);
    }
  };

  return (
    <button 
      onClick={handleLogout} 
      className="bg-[#EEEDEB]  font-semibold py-2 px-4 rounded-lg transition duration-300"
    >
      Logout
    </button>
  );
};

export default Logout;
