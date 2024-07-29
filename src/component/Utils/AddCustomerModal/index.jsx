import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const AddCustomerModal = ({ isOpen, onRequestClose, onCustomerAdded, onCustomerUpdated, editingCustomer }) => {
  const [customerData, setCustomerData] = useState({
    username: '',
    phone: '',
    email: '',
    address: '',
    rating: '',
    walletBalance: '',
    joiningDate: ''
  });

  useEffect(() => {
    if (editingCustomer) {
      setCustomerData(editingCustomer);
    } else {
      setCustomerData({
        username: '',
        phone: '',
        email: '',
        address: '',
        rating: '',
        walletBalance: '',
        joiningDate: ''
      });
    }
  }, [editingCustomer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingCustomer) {
      
      try {
        const response = await axios.put(`http://localhost:3001/customers/${editingCustomer.id}`, customerData);
        onCustomerUpdated(response.data);
      } catch (error) {
        console.error('Failed to update customer', error);
      }
    } else {
      
      try {
        const response = await axios.post('http://localhost:3001/customers', customerData);
        onCustomerAdded(response.data);
      } catch (error) {
        console.error('Failed to add customer', error);
      }
    }
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Customer"
      className="bg-[#2a3042] rounded-lg p-6 mx-auto mt-20 w-full max-w-lg text-white"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <h2 className="text-2xl font-bold mb-4">Add Customer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">UserName</label>
          <input
            type="text"
            name="username"
            value={customerData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-[#32394e] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone No</label>
          <input
            type="text"
            name="phone"
            value={customerData.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-[#32394e] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email Id</label>
          <input
            type="email"
            name="email"
            value={customerData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-[#32394e] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={customerData.address}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-[#32394e] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Rating</label>
          <input
            type="number"
            name="rating"
            value={customerData.rating}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-[#32394e] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Wallet Balance</label>
          <input
            type="number"
            name="walletBalance"
            value={customerData.walletBalance}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-[#32394e] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Joining Date</label>
          <input
            type="date"
            name="joiningDate"
            value={customerData.joiningDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-[#32394e] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingCustomer ? 'Update Customer' : 'Add Customer'}
        </button>
      </form>
    </Modal>
  );
};

export default AddCustomerModal;
