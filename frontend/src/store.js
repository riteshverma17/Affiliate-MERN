// ✅ Import from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './redux/user/reducer';

// ✅ Create and export the store
export const store = configureStore({
  reducer: {
      userDetails: userReducer,
  },
});
