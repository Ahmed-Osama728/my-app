import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// fetch customer request

export const getCustomers = createAsyncThunk(
  '/customers/getCustomers',
  async (args, thunkAPI) => {
    const { rejectedWithValue } = thunkAPI;

    try {
      const res = await fetch('http://localhost:3005/customers');
      const data = await res.json();

      return data;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

// create customer request

export const addCustomer = createAsyncThunk(
  '/customers/addCustomer',
  async (customerData, thunkAPI) => {
    const { rejectedWithValue } = thunkAPI;

    try {
      const res = await fetch('http://localhost:3005/customers', {
        method: 'POST',
        body: JSON.stringify(customerData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
      return res;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);
// create visit request

export const addVisit = createAsyncThunk(
  '/customers/addVisit',
  async (visitData, thunkAPI) => {
    const { rejectedWithValue } = thunkAPI;
    const { data, id } = visitData;
    try {
      const res = await fetch(`http://localhost:3005/customers/${id}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
      return res;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

// delete customer request

export const removeCustomer = createAsyncThunk(
  '/customers/removeCustomer',
  async (id, thunkAPI) => {
    const { rejectedWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:3005/customers/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
      return id;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);
// delete visit request

export const removeVisit = createAsyncThunk(
  '/customers/removeVisit',
  async (id, thunkAPI) => {
    const { rejectedWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:3005/customers/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
      return id;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

const customersReducer = createSlice({
  name: 'customers',
  initialState: { customers: [{ visits: [] }], loading: false, error: null },
  extraReducers: {
    // get the customers data

    [getCustomers.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getCustomers.fulfilled]: (state, action) => {
      state.loading = false;
      state.customers = action.payload;
    },
    [getCustomers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // add customer

    [addCustomer.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [addCustomer.fulfilled]: (state, action) => {
      state.loading = false;
      state.customers.push(action.payload);
    },
    [addCustomer.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // add visit

    [addVisit.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [addVisit.fulfilled]: (state, action) => {
      state.loading = false;
      state.customers[action.payload.visitData.id].visits.push(
        action.payload.visitData.data
      );
    },
    [addVisit.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // delete a customer
    [removeCustomer.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [removeCustomer.fulfilled]: (state, action) => {
      state.loading = false;
      state.customers = state.customers.filter((c) => c.id !== action.payload);
    },
    [removeCustomer.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // delete a visit
    [removeVisit.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [removeVisit.fulfilled]: (state, action) => {
      state.loading = false;
      state.customers.visits = state.customers.visits.filter(
        (v) => v.id !== action.payload
      );
    },
    [removeVisit.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
export default customersReducer.reducer;
