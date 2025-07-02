import React, { useState } from 'react';
import { FiAlertCircle} from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { BiSend } from "react-icons/bi";
// import { transfer } from '../service/transactionService';


const TransferCard = () => {
const [formData, setFormData] = useState({
    recipientAccountNumber: '',
    amount: '',
    code: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = ()=>{
 if (!formData.recipientAccountNumber || formData.recipientAccountNumber.length < 10) {
      setMessage('Please enter a valid account number (at least 10 digits)');
      setMessageType('error');
      return false;
    }
     if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setMessage('Please enter a valid amount greater than 0');
      setMessageType('error');
      return false;
    }
    if (!formData.code || formData.code.length < 4) {
      setMessage('Please enter a valid transaction code (at least 4 characters)');
      setMessageType('error');
      return false;
    }
    return true;
  }

 const handleSubmit = async () => {
  setMessage('');
  if (!validateForm()) return;

  setLoading(true);
  try {
    await transfer({
      recipient: parseInt(formData.recipientAccountNumber),
      amount: parseFloat(formData.amount),
      description: formData.code
    });

    setMessage('Transfer completed successfully!');
    setMessageType('success');
    setFormData({
      recipientAccountNumber: '',
      amount: '',
      code: ''
    });
  } catch (error) {
    console.error('Transfer error:', error);
    if (error.response) {
      const errorMessage = error.response.data?.message || 'Transfer failed. Please try again.';
      setMessage(errorMessage);
    } else if (error.request) {
      setMessage('Network error. Please check your connection and try again.');
    } else {
      setMessage('An unexpected error occurred. Please try again.');
    }
    setMessageType('error');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <div className="flex items-center mb-4">
        <BiSend className="w-5 h-5 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Transfer Money</h2>
      </div>
       {message && (
        <div className={`mb-4 p-3 rounded-md flex items-center text-sm ${
          messageType === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {messageType === 'success' ? (
            <FaCheckCircle className="w-4 h-4 mr-2" />
          ) : (
            <FiAlertCircle className="w-4 h-4 mr-2" />
          )}
          {message}
          
        </div>
      )}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="recipientAccountNumber" className="block text-sm font-medium text-gray-700 mb-2">
            Recipient Account Number
          </label>
          <input
            type="number"
            id="recipientAccountNumber"
            name="recipientAccountNumber"
            value={formData.recipientAccountNumber}
            onChange={handleInputChange}
            // onKeyPress={handleKeyPress}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter account number"/>
        </div>
 <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
            //   onKeyPress={handleKeyPress}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>
        </div>
 <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
            Transaction Code
          </label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
            // onKeyPress={handleKeyPress}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter transaction code"
          />
        </div>
        </div>

        
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
            loading
              ? 'bg-gray-400 cursor-not-allowed shadow-lg'
              : 'bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white shadow-lg hover:shadow-xl'
          }`}
        >
          {loading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            <div className="flex items-center">
              {/* <Send className="w-4 h-4 mr-2" /> */}
              Send Transfer
            </div>
          )}
        </button>
      </div>
      </div>
  )
}

export default TransferCard
