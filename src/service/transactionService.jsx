import apiClient from "./apiClient";



export const deposit = ({ recipientAccountNumber, amount, description }) =>
  apiClient.post('/accounts/deposit', { recipientAccountNumber, amount, description });

export const withdraw = ( {accountNumber, amount, description}) =>
  apiClient.post('/accounts/withdraw', { accountNumber, amount, description });

export const transfer = ({ recipientAccountNumber, amount, description }) =>
  apiClient.post('/accounts/transfer', { recipientAccountNumber, amount, description });

export const getDashboard = async () => {
  const response = await apiClient.get("/api/dashboard");
  return response.data; 
}


// export const fetchTransactions = () =>
//   apiClient.get('/transactions');