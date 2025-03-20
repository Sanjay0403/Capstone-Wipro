import { createSlice } from "@reduxjs/toolkit";
import {
  login as loginService,
  logout as logoutService,
  register as registerService,
  getUser,
} from "../services/authService";

// Load user from localStorage
const storedUser = getUser();
const storedToken = localStorage.getItem("token");

const initialState = {
  user: storedUser || null,
  token: storedToken || null,
};

// Create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user)); // Store full user details
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

// Load User on App Start (Persist User & Token)
export const loadUser = () => (dispatch) => {
  const user = getUser();
  const token = localStorage.getItem("token");

  if (user && token) {
    dispatch(loginSuccess({ user, token }));
  } else {
    dispatch(logoutSuccess()); // Ensure clean state if no valid token
    console.warn(" Invalid user/token. Logging out.");
  }
};

// Login Thunk (Handles Authentication)
export const performLogin = (email, password) => async (dispatch) => {
  try {
    const response = await loginService(email, password);

    if (response && response.token) {
      dispatch(loginSuccess(response));
    } else {
      alert(" Login failed. Please check your credentials.");
    }
  } catch (error) {
    console.error(" Login failed:", error.response?.data || error.message);
    alert(error.response?.data || "Login failed. Please try again.");
  }
};

// Register Thunk (Optional Auto-Login After Registration)
export const register = (fullName, email, password) => async (dispatch) => {
  try {
    const response = await registerService(fullName, email, password);

    if (response && response.token) {
      dispatch(loginSuccess(response)); // Auto-login after registration
      alert("Registration successful! You are now logged in.");
    } else {
      alert("Registration successful! Please log in.");
    }
  } catch (error) {
    console.error("Registration failed:", error.response?.data || error.message);
    alert(error.response?.data || "Registration failed. Please try again.");
  }
};

// Logout Thunk (Clears Token & State)
export const logout = () => (dispatch) => {
  logoutService();
  dispatch(logoutSuccess());
};

// Export reducer
export default authSlice.reducer;
