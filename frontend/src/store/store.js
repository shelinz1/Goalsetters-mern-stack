import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import goalReducer from "../features/goals/goalSlice";

const reducer = {
  auth: authReducer,
  goals: goalReducer,
};

export const store = configureStore({
  reducer,
});
