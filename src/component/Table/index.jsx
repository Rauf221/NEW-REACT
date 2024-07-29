import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { TbPointFilled } from "react-icons/tb";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { PiStarFill } from "react-icons/pi";
import { FaEdit, FaTrash } from 'react-icons/fa';
import AddCustomerModal from '../Utils/AddCustomerModal';
import DeleteConfirmationModal from '../Utils/DeleteConfirmationModal'; 

const Tableee = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionMenu, setActionMenu] = useState({ isOpen: false, customerId: null });
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:3001/customers');
        setCustomers(result.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchData();
  }, []);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentCustomers = customers.slice(offset, offset + itemsPerPage);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);
  };

  const handleCustomerAdded = (newCustomer) => {
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
  };

  const handleCustomerUpdated = (updatedCustomer) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      )
    );
  };

  const handleActionMenuToggle = (customerId) => {
    setActionMenu((prev) => ({
      isOpen: prev.customerId !== customerId || !prev.isOpen,
      customerId: customerId
    }));
  };

  const handleEdit = (customerId) => {
    const customerToEdit = customers.find((customer) => customer.id === customerId);
    setEditingCustomer(customerToEdit);
    setIsModalOpen(true);
  };

  const handleDeleteRequest = (customer) => {
    setCustomerToDelete(customer);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:3001/customers/${customerToDelete.id}`);
      setCustomers((prevCustomers) => prevCustomers.filter(customer => customer.id !== customerToDelete.id));
      setIsDeleteModalOpen(false);
      console.log('Customer deleted', customerToDelete.id);
    } catch (error) {
      console.error('Failed to delete customer', error);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setCustomerToDelete(null);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <select className="p-2 bg-[#2a3042] text-white rounded">
            <option value="10">Show 10</option>
            <option value="20">Show 20</option>
            <option value="50">Show 50</option>
          </select>
          <input
            type="text"
            placeholder="search..."
            className="p-2 bg-[#2a3042] text-white rounded"
          />
        </div>
        <button
          onClick={handleOpenModal}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          + New Customers
        </button>
      </div>
      <table className="min-w-full bg-[#2a3042] overflow-auto">
        <thead className='bg-[#32394e]'>
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Rating</th>
            <th className="px-4 py-2">Wallet Balance</th>
            <th className="px-4 py-2">Joining Date</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.map((customer) => (
            <tr key={customer.id}>
              <td className="px-4 my-3">{customer.id}</td>
              <td className="px-4 my-3">{customer.username}</td>
              <td className="px-4 my-3">{customer.email}</td>
              <td className="px-4 my-3">{customer.phone}</td>
              <td className="flex justify-center">
                <p className='px-4 my-3 bg-green-500 rounded-lg flex items-center'><PiStarFill className='mr-2' />{customer.rating}</p>
              </td>
              <td className="px-4 my-3">${customer.walletBalance}</td>
              <td className="px-4 my-3">{customer.joiningDate}</td>
              <td className="px-4 my-3 relative">
                <button className='flex ml-5' onClick={() => handleActionMenuToggle(customer.id)}><TbPointFilled className='text-xs'/><TbPointFilled className='text-xs' /><TbPointFilled className='text-xs' /></button>
                {actionMenu.isOpen && actionMenu.customerId === customer.id && (
                  <div className="absolute right-0 mt-2 w-32 bg-[#2a3042] rounded-lg shadow-lg py-2 z-10">
                    <button
                      className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#32394e] w-full"
                      onClick={() => handleEdit(customer.id)}
                    >
                      <FaEdit className="mr-2" /> Edit
                    </button>
                    <button
                      className="flex items-center px-4 py-2 text-sm text-red-500 hover:bg-[#32394e] w-full"
                      onClick={() => handleDeleteRequest(customer)}
                    >
                      <FaTrash className="mr-2" /> Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={Math.ceil(customers.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'flex justify-end items-center my-4'}
        pageClassName={'mx-2 flex items-center justify-center'}
        pageLinkClassName={'px-2 py-1 rounded'}
        previousClassName={'mx-2'}
        previousLinkClassName={'px-2 py-1 rounded'}
        nextClassName={'mx-2'}
        nextLinkClassName={'px-2 py-1 rounded'}
        activeClassName={'bg-blue-500 w-10 h-10 text-white rounded-full'}
        activeLinkClassName={'px-2 py-1 rounded-full'}
      />
      <AddCustomerModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        onCustomerAdded={handleCustomerAdded}
        onCustomerUpdated={handleCustomerUpdated}
        editingCustomer={editingCustomer}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onDelete={handleDeleteConfirm}
        customerName={customerToDelete?.username}
      />
    </>
  );
};

export default Tableee;
