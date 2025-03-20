import axios from 'axios';

//const API_URL = "https://localhost:7144/api/expenses";
const API_URL = process.env.REACT_APP_API_BASE_URL + "/expenses";

// Fetch Expenses from Backend
export const fetchExpenses = async () => {
    try {
        const response = await axios.get(API_URL, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching expenses:", error);
        throw error;
    }
};

// Add Expense to Backend
export const addExpense = async (expense) => {
    try {
        const response = await axios.post(API_URL, expense, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error adding expense:", error);
        throw error;
    }
};

// Edit Expense in Backend
export const editExpense = async (expense) => {
    try {
        const response = await axios.put(`${API_URL}/${expense.id}`, expense, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error updating expense:", error);
        throw error;
    }
};

// Delete Expense from Backend
export const deleteExpense = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
    } catch (error) {
        console.error("Error deleting expense:", error);
        throw error;
    }
};
