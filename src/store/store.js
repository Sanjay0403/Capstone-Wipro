import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Authentication reducer
import financeReducer from "./financeSlice"; // Finance reducer (for budgets, expenses, etc.)

export const store = configureStore({
  reducer: {
    auth: authReducer,
    finance: financeReducer, // Add financeReducer
  },
});
