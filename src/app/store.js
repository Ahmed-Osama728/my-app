import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import customersReducer from '../features/counter/customerSlice';

export const store = configureStore({
  reducer: {
    customers: customersReducer
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false
    })
  ]
});
