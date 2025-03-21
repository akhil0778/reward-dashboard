import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('admin/fetchUsers', async () => {
  const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/users`);
  const data = await response.json();
  return data;
});

export const fetchRewards = createAsyncThunk('admin/fetchRewards', async () => {
  const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/rewards`);
  const data = await response.json();
  return data;
});

export const fetchActivities = createAsyncThunk('admin/fetchActivities', async () => {
  const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/activities`);
  const data = await response.json();
  return data;
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],
    rewards: [],
    activities: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchRewards.fulfilled, (state, action) => {
        state.rewards = action.payload;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.activities = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  },
});

export default adminSlice.reducer;