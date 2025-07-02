import axios from "axios"

const BASE_URL = "http://localhost:8085/api/v1"

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    "Content-Type": "application/json",
  },
})

export const deposit = async (amount) => {
  const response = await axios.post(`${BASE_URL}/transactions/deposit`, { amount }, getAuthHeaders())
  return response.data
}

export const withdraw = async (amount) => {
  const response = await axios.post(`${BASE_URL}/transactions/withdraw`, { amount }, getAuthHeaders())
  return response.data
}

export const transfer = async ({ recipient, amount, description }) => {
  const response = await axios.post(
    `${BASE_URL}/transactions/transfer`,
    { recipient, amount, description },
    getAuthHeaders()
  )
  return response.data
}

export const fetchTransactions = async () => {
  const response = await axios.get(`${BASE_URL}/transactions`, getAuthHeaders())
  return response.data
}
