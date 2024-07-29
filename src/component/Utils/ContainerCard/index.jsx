import React from 'react';
import { FaComment } from 'react-icons/fa';

const ContainerCards = ({ customer }) => {
  const statusStyles = {
    Completed: 'bg-green-500',
    Pending: 'bg-yellow-500',
    Delay: 'bg-red-500',
  };
  

  return (
    <div className="bg-[#2a3042] p-4 rounded-lg shadow-lg text-white m-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-gray-800 p-2 rounded-full mr-3">
            <img src={customer.icon} alt={customer.title} className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-lg font-bold">{customer.title}</h2>
            <p className="text-sm">{customer.description}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center mb-4">
        {customer.team.map((member, index) => (
          <img
            key={index}
            src={member.avatar}
            alt={member.name}
            className="w-8 h-8 rounded-full border-2 border-white -ml-2 first:ml-0"
          />
        ))}
        {customer.likes > 3 && (
          <span className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center -ml-2">
            {`+${customer.likes - 3}`}
          </span>
        )}
      </div>
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center">
          <span className={`px-2 py-1 rounded text-sm ${statusStyles[customer.status]}`}>
            {customer.status}
          </span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">{customer.date}</span>
          <span className="flex items-center">
            <FaComment className="mr-1" />
            {customer.comments}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContainerCards;
