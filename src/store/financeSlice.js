import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://localhost:7144/api/expenses";

//  Utility function to get Authorization headers (for bearer token)
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("🚨 No token found in localStorage");
    throw new Error("Unauthorized: No token found");
  }
  return { Authorization: `Bearer ${token}` };
};

//  Fetch expenses with filters (Monthly, Weekly, Yearly, All)
export const fetchExpenses = createAsyncThunk(
  "finance/fetchExpenses",
  async (filterType = "all", { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}?filterType=${filterType}`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error(" Error fetching expenses:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Failed to fetch expenses.");
    }
  }
);

//  Add a new expense
export const addExpense = createAsyncThunk(
  "finance/addExpense",
  async (expense, { rejectWithValue }) => {
    try {
      const formattedExpense = {
        ...expense,
        id: undefined, // Ensure no ID is sent for new expenses
        date: new Date(expense.date).toISOString().split("T")[0], // Ensure 'YYYY-MM-DD' format
        amount: parseFloat(expense.amount), // Ensure amount is a number
      };

      const response = await axios.post(API_URL, formattedExpense, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error(" Error adding expense:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Failed to add expense.");
    }
  }
);

//  Update an existing expense
export const updateExpense = createAsyncThunk(
  "finance/updateExpense",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error(" Error updating expense:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Failed to update expense.");
    }
  }
);

//  Delete an expense
export const deleteExpense = createAsyncThunk(
  "finance/deleteExpense",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: getAuthHeaders(),
      });
      return id;
    } catch (error) {
      console.error("Error deleting expense:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Failed to delete expense.");
    }
  }
);

//  Redux Slice
const financeSlice = createSlice({
  name: "finance",
  initialState: {
    expenses: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch expenses
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add expense
      .addCase(addExpense.pending, (state) => {
        state.loading = true;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses.push(action.payload);
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete expense
      .addCase(deleteExpense.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = state.expenses.filter(
          (expense) => expense.id !== action.payload
        );
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update expense
      .addCase(updateExpense.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        );
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = financeSlice.actions;
export default financeSlice.reducer;
