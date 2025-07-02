import React from 'react'
import { SiWebmoney } from 'react-icons/si';
import { IoPersonCircleOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { MdDashboard, MdPerson, MdSettings, MdPayment, MdHistory } from 'react-icons/md'
import { useState } from 'react';


const Dashboard = () => {
// const [showTransferModal, setShowTransferModal] = useState(false)

  return (
  // shadow px-6 py-4 border-b border-gray-350
  <div className="min-h-screen bg-gray-100">
    <header className="bg-white shadow px-6 py-4 border-b border-gray-350">
      <div className="flex items-center justify-between">
        <div className='flex items-center'>
          <SiWebmoney className="text-blue-600 text-3xl mr-2" />
        <h1 className="text-xl font-bold text-blue-700">FLEXPAY</h1>  
         </div>
          <div className="flex items-center space-x-4">
            <IoPersonCircleOutline className='text-blue-600 text-3xl mr-2' />
            <LuLogOut className='text-blue-600 text-3xl ml-1'/>
          </div>
      </div>
    </header>

 <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center p-3 hover:bg-blue-50 rounded-lg text-gray-700 hover:text-blue-600">
                  <MdDashboard className="text-xl mr-3" />
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-3 hover:bg-blue-50 rounded-lg text-gray-700 hover:text-blue-600">
                  <MdPayment className="text-xl mr-3" />
                  Payments
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-3 hover:bg-blue-50 rounded-lg text-gray-700 hover:text-blue-600">
                  <MdHistory className="text-xl mr-3" />
                  Transaction History
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-3 hover:bg-blue-50 rounded-lg text-gray-700 hover:text-blue-600">
                  <MdPerson className="text-xl mr-3" />
                  Profile
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-3 hover:bg-blue-50 rounded-lg text-gray-700 hover:text-blue-600">
                  <MdSettings className="text-xl mr-3" />
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </div>
    <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to FlexPay Dashboard</h2>

            
            {/* Example content cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-700">Total Balance</h3>
                <p className="text-2xl font-bold text-blue-600">$12,345</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-700">This Month</h3>
                <p className="text-2xl font-bold text-green-600">$2,567</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-700">Transactions</h3>
                <p className="text-2xl font-bold text-purple-600">847</p>
              </div>
              
  </div>
    <div className="flex gap-4 mt-6">
              <button className="flex-1 bg-gradient-to-r from-slate-800 to-slate-900 
              hover:from-slate-900 hover:to-black text-white font-medium py-3 px-4 rounded-xl 
              shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Transfer
              </button>
              <button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 
              hover:from-emerald-600 hover:to-teal-700 text-white font-medium py-3 px-4 rounded-xl
               shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                 Deposit
             </button>
              <button className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 
              hover:from-rose-600 hover:to-pink-700 text-white font-medium py-3 px-4
               rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Withdraw
              </button>
            </div>
   </div>
<div className="bg-white rounded-lg shadow p-6 mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Transactions</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-semibold">Payment to Uncle Mayokun</p>
                  <p className="text-sm text-gray-500">Jan 15, 2025</p>
                </div>
                <span className="text-red-600 font-bold">-$150.00</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-semibold">Salary Deposit</p>
                  <p className="text-sm text-gray-500">Jan 10, 2025</p>
                </div>
                <span className="text-green-600 font-bold">+$3,200.00</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-semibold">Grocery Store</p>
                  <p className="text-sm text-gray-500">Jan 8, 2025</p>
                </div>
                <span className="text-red-600 font-bold">-$85.50</span>
              </div>
            </div>
          </div>

    </div>


    

        </div>
    

     </div>
)

}

export default Dashboard
