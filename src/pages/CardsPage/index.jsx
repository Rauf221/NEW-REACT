import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaComments,
  FaFile,
  FaStore,
  FaShoppingCart,
  FaBitcoin,
  FaEnvelope,
  FaFileInvoice,
  FaBars,
  FaUserCircle,
  FaSearch,
  FaBell,
} from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { PiBracketsSquareBold, PiSquaresFour } from "react-icons/pi";
import ContainerCards from "../../component/Utils/ContainerCard";
import { Link } from "react-router-dom";

const CardsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:3001/customers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  

  return (
    <div className="flex h-screen">
      {isSidebarOpen && (
        <div className="bg-[#2a3042] text-gray-200 w-64">
          <div className="p-6 pl-16 text-2xl font-semibold flex">
            <img
              className="rounded-full h-8 w-8 mr-4"
              src="https://skote-v-dark.react.themesbrand.com/static/media/logo-light.96c274dae02dae215c95d0a7ef202e3a.svg"
              alt=""
            />
            <h1>SOKET</h1>
          </div>
          <nav className="mt-10">
            <div className="flex items-center justify-between rounded hover:bg-gray-700">
              <Link to="/home" className="flex items-center py-2.5 px-4 rounded">
                <AiFillDashboard className="mr-3" /> Dashboards
              </Link>
              <IoIosArrowDown className="mr-2" />
            </div>
            <Link
              to="/Cards"
              className="flex items-center py-2.5 px-4 rounded hover:bg-gray-700"
            >
              <FaFile className="mr-3" /> Customers
            </Link>
          </nav>
        </div>
      )}
      <div
        className={`flex-1 bg-[#2a3042] text-gray-200 transition-all duration-300 ${
          isSidebarOpen ? "" : "ml-0"
        }`}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center">
            <FaBars
              className="text-xl mr-6 cursor-pointer"
              onClick={toggleSidebar}
            />
            <FaSearch className="text-l mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-[#2a3042] text-gray-200 rounded px-4 py-2 focus:outline-none"
            />
            <span className="text-lg mr-96">Mega Menu</span>
          </div>
          <div className="flex items-center">
            <img
              src="https://cdn.britannica.com/33/4833-050-F6E415FE/Flag-United-States-of-America.jpg"
              alt="Flag"
              className="h-5 w-9 mr-4 bg-slate-400"
            />
            <PiSquaresFour className="text-xl mr-4" />
            <PiBracketsSquareBold className="text-xl mr-4" />
            <FaBell className="text-xl mr-4" />
            <img
              src="https://skote-v-dark.react.themesbrand.com/static/media/avatar-4.b23e41d9c09997efbc21.jpg"
              alt="profilepic"
              className="rounded-full h-8 w-8 mr-4 bg-slate-400"
            />
            <span>admin</span>
            <FiSettings className="text-xl ml-4" />
          </div>
        </header>
        <main className="p-6 h-[620px] overflow-auto bg-[#222736]">
          <h1 className="text-2xl mb-3">Projects Grid</h1>
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {customers.map((customer) => (
                <ContainerCards key={customer.id} customer={customer} />
              ))}
            </div>
          </div>
        </main>
        <div className="h-[70px] w-full flex items-center justify-between">
          <h1>2024 © Skote.</h1>
          <h1 className="pr-12">Design & Develop by KYZR</h1>
        </div>
      </div>
    </div>
  );
};

export default CardsPage;
