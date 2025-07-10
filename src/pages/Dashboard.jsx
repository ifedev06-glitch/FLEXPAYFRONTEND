import React, { useEffect, useState } from 'react';
import { SiWebmoney } from 'react-icons/si';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { LuLogOut } from 'react-icons/lu';
import {
  MdDashboard,
  MdPerson,
  MdSettings,
  MdPayment,
  MdHistory,
  MdMenu,
  MdClose,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { getDashboard } from '../service/transactionService';

const Dashboard = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboard();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p className="p-6">Loading dashboard...</p>;
  if (!dashboardData) return <p className="p-6">Failed to load dashboard.</p>;

  const { firstname, lastname, balance, accountNumber, transactions } = dashboardData;
  const name = `${firstname} ${lastname}`;
  const displayedTransactions = showAll ? transactions : transactions.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4 border-b border-gray-350 flex justify-between items-center z-50 relative">
        <div className="flex items-center space-x-3">
          {/* Hamburger menu - mobile only */}
          <button
            className="md:hidden text-3xl text-blue-600 focus:outline-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <MdClose /> : <MdMenu />}
          </button>
          <SiWebmoney className="text-blue-600 text-3xl" />
          <h1 className="text-xl font-bold text-blue-700">FLEXPAY</h1>
        </div>
        <div className="flex items-center space-x-4">
          <IoPersonCircleOutline className="text-blue-600 text-3xl" />
          <LuLogOut className="text-blue-600 text-3xl" />
        </div>
      </header>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
        ></div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-sm transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex`}
        >
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <a href="/profile" className="flex items-center p-3 hover:bg-blue-50 rounded-lg text-gray-700 hover:text-blue-600">
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
                <button
                  onClick={() => setHistoryModalOpen(true)}
                  className="w-full text-left flex items-center p-3 hover:bg-blue-50 rounded-lg text-gray-700 hover:text-blue-600"
                >
                  <MdHistory className="text-xl mr-3" />
                  Transaction History
                </button>
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

        {/* Main Dashboard */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome, {name}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-700">Total Balance</h3>
                <p className="text-2xl font-bold text-blue-600">₦{balance?.toLocaleString() ?? '0.00'}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-700">Account Number</h3>
                <p className="text-2xl font-bold text-green-600">{accountNumber}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-700">Transactions</h3>
                <p className="text-2xl font-bold text-purple-600">{transactions.length}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => navigate('/transfer')}
                className="flex-1 bg-gradient-to-r from-slate-800 to-slate-900 text-white font-medium py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Transfer
              </button>
              <button
                onClick={() => navigate('/deposit')}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Deposit
              </button>
              <button
                onClick={() => navigate('/withdraw')}
                className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-medium py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Withdraw
              </button>
            </div>
          </div>

          {/* Transactions Preview */}
          <div className="bg-white p-4 rounded-lg shadow-md mt-4">
            <h2 className="text-lg font-semibold mb-3">Transaction History</h2>
            {transactions.length === 0 ? (
              <p className="text-gray-500">No recent transactions.</p>
            ) : (
              <>
                <div className="space-y-3">
                  {displayedTransactions.map((tx) => (
                    <div
                      key={tx.txId}
                      onClick={() => setSelectedTx(tx)}
                      className="cursor-pointer flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100 transition"
                    >
                      <div>
                        <p className="font-semibold">{tx.description}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(tx.createdAt).toLocaleDateString('en-NG', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <span
                        className={`font-bold ${
                          tx.type === 'DEPOSIT' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {tx.type === 'DEPOSIT' ? '+' : '-'}₦
                        {tx.amount.toLocaleString('en-NG', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  ))}
                </div>
                {transactions.length > 3 && (
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="mt-3 text-sm text-blue-600 hover:underline"
                  >
                    {showAll ? 'Show Less' : 'View All'}
                  </button>
                )}
              </>
            )}

            {/* All Transactions Modal */}
            {historyModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
                  <h2 className="text-xl font-bold mb-4 text-center">All Transactions</h2>
                  {transactions.length === 0 ? (
                    <p className="text-gray-500 text-center">No transactions found.</p>
                  ) : (
                    <div className="space-y-3">
                      {transactions.map((tx) => (
                        <div
                          key={tx.txId}
                          onClick={() => {
                            setSelectedTx(tx);
                            setHistoryModalOpen(false);
                          }}
                          className="cursor-pointer flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100 transition"
                        >
                          <div>
                            <p className="font-semibold">{tx.description}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(tx.createdAt).toLocaleDateString('en-NG', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                          <span
                            className={`font-bold ${
                              tx.type === 'DEPOSIT' ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {tx.type === 'DEPOSIT' ? '+' : '-'}₦
                            {tx.amount.toLocaleString('en-NG', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setHistoryModalOpen(false)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Transaction Receipt Modal */}
            {selectedTx && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
                  <h2 className="text-xl font-bold mb-4 text-center">Transaction Receipt</h2>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Type:</span> {selectedTx.type}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span> {selectedTx.status}
                    </p>
                    <p>
                      <span className="font-medium">Amount:</span> ₦{selectedTx.amount.toLocaleString()}
                    </p>
                    <p>
                      <span className="font-medium">Fee:</span> ₦{selectedTx.txFee}
                    </p>
                    <p>
                      <span className="font-medium">Description:</span> {selectedTx.description}
                    </p>
                    <p>
                      <span className="font-medium">Date:</span>{' '}
                      {new Date(selectedTx.createdAt).toLocaleString('en-NG')}
                    </p>
                    <p>
                      <span className="font-medium">Reference:</span> {selectedTx.txId}
                    </p>
                  </div>
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setSelectedTx(null)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
